from qdrant_client.models import Document

# Qdrant Cloud Inference generates the vectors server-side — the process
# never loads an embedding model itself.
MODEL_NAME = "intfloat/multilingual-e5-small"


def query_document(text: str) -> Document:
    # Applied client-side rather than relying on the server to do it:
    # Qdrant Cloud Inference does not yet auto-apply the query:/passage:
    # prefixes E5 models require (github.com/qdrant/qdrant/issues/9024,
    # open as of 2026-05) — it embeds the literal text either way.
    return Document(text=f"query: {text}", model=MODEL_NAME)


def passage_document(text: str) -> Document:
    return Document(text=f"passage: {text}", model=MODEL_NAME)
