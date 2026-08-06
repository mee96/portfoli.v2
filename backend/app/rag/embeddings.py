import logging
import os
import threading
from pathlib import Path

import psutil
from fastembed import TextEmbedding

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
CACHE_DIR = Path(__file__).resolve().parents[2] / ".fastembed_cache"

logger = logging.getLogger("uvicorn")

_model: TextEmbedding | None = None
_model_lock = threading.Lock()


def _load_model() -> TextEmbedding:
    model = TextEmbedding(
        model_name=MODEL_NAME,
        threads=1,
        providers=["CPUExecutionProvider"],
        cache_dir=str(CACHE_DIR),
    )
    rss_mb = psutil.Process(os.getpid()).memory_info().rss / (1024 * 1024)
    logger.info(f"Embedding model loaded — process RSS: {rss_mb:.1f} MB")
    return model


def _get_model() -> TextEmbedding:
    global _model
    if _model is None:
        with _model_lock:
            # Double-check: another thread may have finished loading while
            # this one was waiting for the lock.
            if _model is None:
                _model = _load_model()
    return _model


def warm_up() -> None:
    """Start loading the model on a background thread at process startup.

    This way the memory peak from loading lands before any WebSocket
    connection is being served, instead of racing a real request for
    memory the first time someone asks a question. If a request does
    arrive before this finishes, `_get_model()`'s lock makes it wait for
    the same load rather than starting a second one.
    """
    threading.Thread(target=_get_model, daemon=True).start()


def embed_query(text: str) -> list[float]:
    vector = next(_get_model().embed([text]))
    return vector.tolist()


def embed_passages(texts: list[str]) -> list[list[float]]:
    return [vector.tolist() for vector in _get_model().embed(texts)]
