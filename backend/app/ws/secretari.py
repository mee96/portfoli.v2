import logging
from pathlib import Path

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.groq_client import stream_completion
from app.rag.search import search
from app.ratelimit import SlidingWindowLimiter, client_ip

logger = logging.getLogger(__name__)

router = APIRouter()

# Loaded once at import time, used verbatim as the system prompt — never
# summarised or rewritten, per spec.
SYSTEM_PROMPT_PATH = Path(__file__).resolve().parents[2] / "prompts" / "secretario-prompt.md"
SYSTEM_PROMPT = SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")

# Welcome per UI language. The Spanish text is the one in the "PRIMER MENSAJE"
# section of secretario-prompt.md; the frontend sends its active language as
# ?lang= when it opens the socket.
DEFAULT_LANG = "es"
WELCOME_MESSAGES = {
    "es": (
        "Hola, soy Bunsen — el secretario de Carme. Pregúntame lo que quieras "
        "sobre su trabajo, sus proyectos o cómo es currando; si además me pillas "
        "en buen momento, seguro que se me escapa alguna anécdota de más."
    ),
    "en": (
        "Hi, I'm Bunsen — Carme's secretary. Ask me anything about her work, "
        "her projects or what she's like to work with; and if you catch me in "
        "a good mood, I'll probably let a story or two slip."
    ),
    "ca": (
        "Hola, sóc Bunsen — el secretari de Carme. Pregunta'm el que vulguis "
        "sobre la seva feina, els seus projectes o com és currar amb ella; i si "
        "em pesques de bon humor, segur que se m'escapa alguna anècdota de més."
    ),
}

# Reminder sent with every turn so short or ambiguous messages ("hi", "ok")
# are answered in a sensible language instead of the prompt's Spanish.
LANGUAGE_NOTES = {
    "es": "Contesta en el idioma del último mensaje del usuario. Si es muy corto o ambiguo, contesta en castellano. Un saludo como 'hi' o 'hello' es inglés y se contesta en inglés.",
    "en": "Reply in the language of the user's latest message. If it is very short or ambiguous, reply in English. A greeting such as 'hola' is Spanish and is answered in Spanish; 'hi' or 'hello' is English.",
    "ca": "Contesta en l'idioma de l'últim missatge de l'usuari. Si és molt curt o ambigu, contesta en català. Una salutació com 'hi' o 'hello' és anglès i es contesta en anglès; 'hola' és castellà i es contesta en castellà.",
}

# Abuse limits. Anything over a limit gets a short canned reply (streamed like a
# normal answer, so the frontend needs no special case) and never reaches Groq.
MAX_MESSAGE_CHARS = 500  # per user message; keep in sync with the chat input's maxlength
MAX_USER_TURNS = 30  # user messages answered per connection
CONTEXT_MESSAGES = 12  # most recent history messages sent to the model

# Messages per client IP per minute, plus a global ceiling that still holds if
# the client IP can't be trusted.
ip_limiter = SlidingWindowLimiter(limit=15, window_seconds=60)
global_limiter = SlidingWindowLimiter(limit=120, window_seconds=60)

NOTICES = {
    "too_long": {
        "es": "Ese mensaje es demasiado largo para mí — ¿puedes resumirlo en menos de 500 caracteres?",
        "en": "That message is a bit long for me — could you shorten it to under 500 characters?",
        "ca": "Aquest missatge és massa llarg per a mi — pots resumir-lo en menys de 500 caràcters?",
    },
    "rate_limited": {
        "es": "Voy un poco justo de tiempo ahora mismo — dame un minuto y vuelve a preguntarme.",
        "en": "I'm a bit swamped right now — give me a minute and ask again.",
        "ca": "Vaig una mica just de temps ara mateix — dona'm un minut i torna a preguntar-me.",
    },
    "turn_limit": {
        "es": "Hemos hablado bastante en esta conversación. Recarga la página para empezar de cero, o escribe a Carme desde el formulario de contacto.",
        "en": "We've talked quite a lot in this conversation. Reload the page to start fresh, or write to Carme using the contact form.",
        "ca": "Hem parlat bastant en aquesta conversa. Recarrega la pàgina per començar de zero, o escriu a la Carme des del formulari de contacte.",
    },
    "error": {
        "es": "Se me ha cruzado un cable y no he podido responder. Inténtalo de nuevo en un momento.",
        "en": "Something got crossed on my end and I couldn't answer. Please try again in a moment.",
        "ca": "Se m'ha creuat un cable i no he pogut respondre. Torna-ho a provar d'aquí un moment.",
    },
}

CONTEXT_HEADER = "FRAGMENTOS RECUPERADOS DEL EXPEDIENTE DE CARME:"
NO_CONTEXT = "(No se ha recuperado ningún fragmento relevante para esta pregunta.)"

COFFEE_NOTE_ONCE = (
    "Ya le has ofrecido un café antes en esta conversación — si quieres "
    "volver sobre el tema, usa la variante del suspiro con la máquina de la "
    "oficina, no repitas la oferta literal."
)
COFFEE_NOTE_PAUSE = "No hagas ninguna broma sobre el café en esta respuesta."
COFFEE_MIN_TURNS_BEFORE_FIRST = 3  # first joke only from the 3rd answer on
COFFEE_MIN_TURNS_BETWEEN = 4  # then at least this many answers before the next
COFFEE_WORDS = ("café", "cafè", "coffee")
COFFEE_NOTE_ENOUGH = "Ya has mencionado el café dos veces en esta conversación. No lo menciones más."


async def _say(websocket: WebSocket, text: str) -> None:
    await websocket.send_json({"type": "chunk", "text": text})
    await websocket.send_json({"type": "end"})


def _safe_search(query: str) -> list[str]:
    try:
        return search(query)
    except Exception:
        # Answer without context rather than dropping the conversation.
        logger.exception("RAG search failed")
        return []


def _coffee_note(coffee_mentions: int, user_turns: int = 99, last_coffee_turn: int = 0) -> str | None:
    if coffee_mentions == 0:
        return COFFEE_NOTE_PAUSE if user_turns < COFFEE_MIN_TURNS_BEFORE_FIRST else None
    if coffee_mentions == 1:
        if user_turns - last_coffee_turn < COFFEE_MIN_TURNS_BETWEEN:
            return COFFEE_NOTE_PAUSE
        return COFFEE_NOTE_ONCE
    return COFFEE_NOTE_ENOUGH


@router.websocket("/ws/secretari")
async def secretari_ws(websocket: WebSocket) -> None:
    await websocket.accept()
    lang = websocket.query_params.get("lang", DEFAULT_LANG)
    if lang not in WELCOME_MESSAGES:
        lang = DEFAULT_LANG
    welcome_message = WELCOME_MESSAGES[lang]
    ip = client_ip(websocket)
    await websocket.send_json({"type": "welcome", "text": welcome_message})

    # Seed the history with the welcome as Bunsen's own turn — otherwise Groq
    # has no record of it, sees an empty history on the first real message,
    # and (per the system prompt's "PRIMER MENSAJE" instruction) repeats the
    # welcome text verbatim instead of actually answering.
    history: list[dict] = [{"role": "assistant", "content": welcome_message}]
    coffee_mentions = 0
    last_coffee_turn = 0
    user_turns = 0

    try:
        while True:
            user_message = (await websocket.receive_text()).strip()
            if not user_message:
                continue

            if len(user_message) > MAX_MESSAGE_CHARS:
                await _say(websocket, NOTICES["too_long"][lang])
                continue

            if user_turns >= MAX_USER_TURNS:
                await _say(websocket, NOTICES["turn_limit"][lang])
                continue

            if not (ip_limiter.allow(ip) and global_limiter.allow("global")):
                await _say(websocket, NOTICES["rate_limited"][lang])
                continue

            user_turns += 1

            try:
                fragments = _safe_search(user_message)
                context_block = "\n\n".join(fragments) if fragments else NO_CONTEXT

                messages = [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *history[-CONTEXT_MESSAGES:],
                    {"role": "system", "content": f"{CONTEXT_HEADER}\n\n{context_block}"},
                ]

                coffee_note = _coffee_note(coffee_mentions, user_turns, last_coffee_turn)
                if coffee_note:
                    messages.append({"role": "system", "content": coffee_note})

                messages.append({"role": "system", "content": LANGUAGE_NOTES[lang]})
                messages.append({"role": "user", "content": user_message})

                full_response = ""
                async for delta in stream_completion(messages):
                    full_response += delta
                    await websocket.send_json({"type": "chunk", "text": delta})

                await websocket.send_json({"type": "end"})
            except WebSocketDisconnect:
                raise
            except Exception:
                logger.exception("Bunsen could not answer")
                try:
                    await _say(websocket, NOTICES["error"][lang])
                except Exception:
                    return
                continue

            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": full_response})

            if any(word in full_response.lower() for word in COFFEE_WORDS):
                coffee_mentions += 1
                last_coffee_turn = user_turns
    except WebSocketDisconnect:
        pass
