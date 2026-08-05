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


@router.websocket("/ws/secretari")
async def secretari_ws(websocket: WebSocket) -> None:
    await websocket.accept()
    await websocket.send_text(WELCOME_MESSAGE)

    # Per-connection conversation history, lost on disconnect — no persistence.
    history: list[dict] = []

    try:
        while True:
            user_message = await websocket.receive_text()

            fragments = search(user_message)
            context_block = "\n\n".join(fragments) if fragments else NO_CONTEXT

            messages = [
                {"role": "system", "content": SYSTEM_PROMPT},
                *history,
                {"role": "system", "content": f"{CONTEXT_HEADER}\n\n{context_block}"},
                {"role": "user", "content": user_message},
            ]

            full_response = ""
            async for delta in stream_completion(messages):
                full_response += delta
                await websocket.send_text(delta)

            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": full_response})
    except WebSocketDisconnect:
        pass
