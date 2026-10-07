import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.ws.secretari import WELCOME_MESSAGES

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.parametrize(
    ("query", "expected"),
    [
        ("?lang=es", "es"),
        ("?lang=en", "en"),
        ("?lang=ca", "ca"),
        ("?lang=xx", "es"),  # unknown language falls back to Spanish
        ("", "es"),  # no language falls back to Spanish
    ],
)
def test_welcome_follows_ui_language(query, expected):
    with client.websocket_connect(f"/ws/secretari{query}") as ws:
        message = ws.receive_json()

    assert message == {"type": "welcome", "text": WELCOME_MESSAGES[expected]}


def test_contact_rejects_invalid_email():
    response = client.post(
        "/contact", json={"name": "Ada", "email": "not-an-email", "message": "Hi"}
    )

    assert response.status_code == 422


def test_contact_sends_email_with_reply_to(monkeypatch):
    sent = {}
    monkeypatch.setenv("RESEND_API_KEY", "test-key")
    monkeypatch.setattr("app.contact.resend.Emails.send", lambda params: sent.update(params))

    response = client.post(
        "/contact", json={"name": "Ada", "email": "ada@example.com", "message": "Hello"}
    )

    assert response.status_code == 200
    assert response.json() == {"status": "sent"}
    assert sent["reply_to"] == "ada@example.com"
    assert "Hello" in sent["text"]
