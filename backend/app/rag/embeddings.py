from functools import lru_cache

from fastembed import TextEmbedding

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


@lru_cache(maxsize=1)
def _get_model() -> TextEmbedding:
    # Cached so the ONNX model is loaded once per process, not once per call.
    return TextEmbedding(model_name=MODEL_NAME)


def embed_query(text: str) -> list[float]:
    vector = next(_get_model().embed([text]))
    return vector.tolist()


def embed_passages(texts: list[str]) -> list[list[float]]:
    return [vector.tolist() for vector in _get_model().embed(texts)]
