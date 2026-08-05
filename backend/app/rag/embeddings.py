from functools import lru_cache

from fastembed import TextEmbedding

MODEL_NAME = "intfloat/multilingual-e5-large"


@lru_cache(maxsize=1)
def _get_model() -> TextEmbedding:
    # Cached so the ONNX model is loaded once per process, not once per call.
    return TextEmbedding(model_name=MODEL_NAME)


def embed_query(text: str) -> list[float]:
    # e5 models require the "query: " prefix on the search question.
    vector = next(_get_model().embed([f"query: {text}"]))
    return vector.tolist()


def embed_passages(texts: list[str]) -> list[list[float]]:
    # e5 models require the "passage: " prefix on indexed content.
    prefixed = [f"passage: {text}" for text in texts]
    return [vector.tolist() for vector in _get_model().embed(prefixed)]
