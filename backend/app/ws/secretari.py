from pathlib import Path

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.groq_client import stream_completion
from app.rag.search import search

router = APIRouter()

# Loaded once at import time, used verbatim as the system prompt — never
# summarised or rewritten, per spec.
SYSTEM_PROMPT_PATH = Path(__file__).resolve().parents[2] / "docs" / "secretario-prompt.md"
SYSTEM_PROMPT = SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")

# Copied verbatim from the "PRIMER MENSAJE" section of secretario-prompt.md.
WELCOME_MESSAGE = (
    "Hola, soy Bunsen — el secretario de Carme. Pregúntame lo que quieras "
    "sobre su trabajo, sus proyectos o cómo es currando; si además me pillas "
    "en buen momento, seguro que se me escapa alguna anécdota de más."
)

CONTEXT_HEADER = "FRAGMENTOS RECUPERADOS DEL EXPEDIENTE DE CARME:"
NO_CONTEXT = "(No se ha recuperado ningún fragmento relevante para esta pregunta.)"

COFFEE_NOTE_ONCE = (
    "Ya le has ofrecido un café antes en esta conversación — si quieres "
    "volver sobre el tema, usa la variante del suspiro con la máquina de la "
    "oficina, no repitas la oferta literal."
)
COFFEE_NOTE_ENOUGH = "Ya has mencionado el café dos veces en esta conversación. No lo menciones más."


def _coffee_note(coffee_mentions: int) -> str | None:
    if coffee_mentions == 0:
        return None
    if coffee_mentions == 1:
        return COFFEE_NOTE_ONCE
    return COFFEE_NOTE_ENOUGH


@router.websocket("/ws/secretari")
async def secretari_ws(websocket: WebSocket) -> None:
    await websocket.accept()
    await websocket.send_json({"type": "welcome", "text": WELCOME_MESSAGE})

    # Seed the history with the welcome as Bunsen's own turn — otherwise Groq
    # has no record of it, sees an empty history on the first real message,
    # and (per the system prompt's "PRIMER MENSAJE" instruction) repeats the
    # welcome text verbatim instead of actually answering.
    history: list[dict] = [{"role": "assistant", "content": WELCOME_MESSAGE}]
    coffee_mentions = 0

    try:
        while True:
            user_message = await websocket.receive_text()

            fragments = search(user_message)
            context_block = "\n\n".join(fragments) if fragments else NO_CONTEXT

            messages = [
                {"role": "system", "content": SYSTEM_PROMPT},
                *history,
                {"role": "system", "content": f"{CONTEXT_HEADER}\n\n{context_block}"},
            ]

            coffee_note = _coffee_note(coffee_mentions)
            if coffee_note:
                messages.append({"role": "system", "content": coffee_note})

            messages.append({"role": "user", "content": user_message})

            full_response = ""
            async for delta in stream_completion(messages):
                full_response += delta
                await websocket.send_json({"type": "chunk", "text": delta})

            await websocket.send_json({"type": "end"})

            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": full_response})

            if "café" in full_response.lower():
                coffee_mentions += 1
    except WebSocketDisconnect:
        pass
