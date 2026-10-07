import pytest
from fastapi.testclient import TestClient

from app import contact
from app.main import app
from app.ratelimit import SlidingWindowLimiter
from app.ws import secretari

client = TestClient(app)


def fake_stream(*chunks):
    async def stream(messages):
        for chunk in chunks:
            yield chunk

    return stream


async def failing_stream(messages):
    raise RuntimeError("groq is down")
    yield  # pragma: no cover - makes this an async generator


def ask(ws, text):
    """Send one message and collect the streamed reply up to the 'end' marker."""
    ws.send_text(text)
    reply = ""
    while True:
        message = ws.receive_json()
        if message["type"] == "end":
            return reply
        assert message["type"] == "chunk"
        reply += message["text"]


@pytest.fixture
def groq(monkeypatch):
    """Replace Groq and Qdrant so no test touches the network."""
    calls = []

    def install(stream):
        async def recording(messages):
            calls.append(messages)
            async for chunk in stream(messages):
                yield chunk

        monkeypatch.setattr(secretari, "stream_completion", recording)

    monkeypatch.setattr(secretari, "search", lambda query: [])
    install(fake_stream("Hola ", "Carme"))
    install.calls = calls
    return install


# --- limiter ---------------------------------------------------------------


def test_limiter_blocks_after_limit_and_recovers_after_window():
    now = [0.0]
    limiter = SlidingWindowLimiter(limit=2, window_seconds=10, clock=lambda: now[0])

    assert limiter.allow("a") and limiter.allow("a")
    assert not limiter.allow("a")
    assert limiter.allow("b")  # keys are independent

    now[0] = 10.0
    assert limiter.allow("a")


# --- chat ------------------------------------------------------------------


def test_chat_streams_a_normal_reply(groq):
    with client.websocket_connect("/ws/secretari?lang=en") as ws:
        ws.receive_json()  # welcome
        assert ask(ws, "Hi") == "Hola Carme"


def test_chat_rejects_long_message_without_calling_groq(groq):
    with client.websocket_connect("/ws/secretari?lang=en") as ws:
        ws.receive_json()
        reply = ask(ws, "x" * (secretari.MAX_MESSAGE_CHARS + 1))

    assert reply == secretari.NOTICES["too_long"]["en"]
    assert groq.calls == []


def test_chat_accepts_message_at_the_limit(groq):
    with client.websocket_connect("/ws/secretari") as ws:
        ws.receive_json()
        assert ask(ws, "x" * secretari.MAX_MESSAGE_CHARS) == "Hola Carme"


def test_chat_stops_answering_after_turn_limit(groq, monkeypatch):
    monkeypatch.setattr(secretari, "MAX_USER_TURNS", 2)

    with client.websocket_connect("/ws/secretari?lang=ca") as ws:
        ws.receive_json()
        assert ask(ws, "1") == "Hola Carme"
        assert ask(ws, "2") == "Hola Carme"
        assert ask(ws, "3") == secretari.NOTICES["turn_limit"]["ca"]

    assert len(groq.calls) == 2


def test_chat_rate_limits_per_ip(groq, monkeypatch):
    monkeypatch.setattr(secretari, "ip_limiter", SlidingWindowLimiter(2, 60))

    with client.websocket_connect("/ws/secretari") as ws:
        ws.receive_json()
        assert ask(ws, "1") == "Hola Carme"
        assert ask(ws, "2") == "Hola Carme"
        assert ask(ws, "3") == secretari.NOTICES["rate_limited"]["es"]


def test_chat_rate_limits_globally_even_with_forged_ips(groq, monkeypatch):
    monkeypatch.setattr(secretari, "global_limiter", SlidingWindowLimiter(1, 60))

    with client.websocket_connect("/ws/secretari", headers={"x-forwarded-for": "1.1.1.1"}) as a:
        a.receive_json()
        assert ask(a, "1") == "Hola Carme"

    with client.websocket_connect("/ws/secretari", headers={"x-forwarded-for": "2.2.2.2"}) as b:
        b.receive_json()
        assert ask(b, "2") == secretari.NOTICES["rate_limited"]["es"]


def test_chat_survives_a_groq_failure(groq):
    groq(failing_stream)

    with client.websocket_connect("/ws/secretari?lang=en") as ws:
        ws.receive_json()
        assert ask(ws, "Hi") == secretari.NOTICES["error"]["en"]

        groq(fake_stream("back", " again"))
        assert ask(ws, "Hi again") == "back again"


def test_chat_sends_only_recent_history_to_the_model(groq):
    with client.websocket_connect("/ws/secretari") as ws:
        ws.receive_json()
        for i in range(secretari.CONTEXT_MESSAGES):  # far more history than the cap
            ask(ws, f"question {i}")

    sent = groq.calls[-1]
    conversation = [m for m in sent if m["role"] in ("user", "assistant")]
    assert len(conversation) <= secretari.CONTEXT_MESSAGES + 1  # + the new question
    assert conversation[-1] == {"role": "user", "content": f"question {secretari.CONTEXT_MESSAGES - 1}"}


# --- contact ---------------------------------------------------------------


def post_contact(**overrides):
    payload = {"name": "Ada", "email": "ada@example.com", "message": "Hello"} | overrides
    return client.post("/contact", json=payload)


@pytest.fixture
def resend_ok(monkeypatch):
    sent = []
    monkeypatch.setenv("RESEND_API_KEY", "test-key")
    monkeypatch.setattr("app.contact.resend.Emails.send", sent.append)
    return sent


def test_contact_rejects_oversized_fields(resend_ok):
    assert post_contact(message="x" * (contact.MAX_MESSAGE_CHARS + 1)).status_code == 422
    assert post_contact(name="x" * (contact.MAX_NAME_CHARS + 1)).status_code == 422
    assert resend_ok == []


def test_contact_rejects_blank_name_and_message(resend_ok):
    assert post_contact(name="   ").status_code == 422
    assert post_contact(message="  \n ").status_code == 422
    assert resend_ok == []


def test_contact_keeps_the_subject_on_one_line(resend_ok):
    response = post_contact(name="Ada\r\nBcc: someone@example.com")

    assert response.status_code == 200
    assert "\n" not in resend_ok[0]["subject"] and "\r" not in resend_ok[0]["subject"]


def test_contact_does_not_leak_provider_errors(monkeypatch):
    monkeypatch.setenv("RESEND_API_KEY", "test-key")

    def boom(params):
        raise RuntimeError("re_SECRET_provider_detail")

    monkeypatch.setattr("app.contact.resend.Emails.send", boom)

    response = post_contact()

    assert response.status_code == 500
    assert "re_SECRET" not in response.text


def test_contact_rate_limits_per_ip(resend_ok, monkeypatch):
    monkeypatch.setattr(contact, "ip_limiter", SlidingWindowLimiter(2, 3600))

    assert post_contact().status_code == 200
    assert post_contact().status_code == 200
    assert post_contact().status_code == 429
    assert len(resend_ok) == 2


def test_coffee_joke_is_paced():
    from app.ws import secretari as s

    # Too early: no joke in the first answers.
    assert s._coffee_note(0, user_turns=1) == s.COFFEE_NOTE_PAUSE
    assert s._coffee_note(0, user_turns=3) is None
    # Right after the first joke: pause; later: allowed once more.
    assert s._coffee_note(1, user_turns=4, last_coffee_turn=3) == s.COFFEE_NOTE_PAUSE
    assert s._coffee_note(1, user_turns=8, last_coffee_turn=3) == s.COFFEE_NOTE_ONCE
    # After two jokes: never again.
    assert s._coffee_note(2, user_turns=20, last_coffee_turn=8) == s.COFFEE_NOTE_ENOUGH
