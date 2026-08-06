from functools import lru_cache

from fastembed import TextEmbedding

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


@lru_cache(maxsize=1)
def _get_model() -> TextEmbedding:
    # Cached so the ONNX model is loaded once per process, not once per call.
    # threads=1 caps both intra- and inter-op parallelism (fastembed applies
    # it to both), and providers=["CPUExecutionProvider"] skips the CUDA
    # device probe (the "no GPU found" log noise) — together these lower the
    # peak memory ONNX Runtime uses during inference, which matters on
    # Render's 512MB free-tier instances.
    return TextEmbedding(
        model_name=MODEL_NAME,
        threads=1,
        providers=["CPUExecutionProvider"],
    )


def warm_up() -> None:
    """Force the model to load now, so startup logs show its real memory cost."""
    _get_model()


def embed_query(text: str) -> list[float]:
    vector = next(_get_model().embed([text]))
    return vector.tolist()


def embed_passages(texts: list[str]) -> list[list[float]]:
    return [vector.tolist() for vector in _get_model().embed(texts)]
