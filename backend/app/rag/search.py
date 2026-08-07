import os
from functools import lru_cache

from dotenv import load_dotenv
from qdrant_client import QdrantClient

from app.rag.embeddings import query_document

load_dotenv()


@lru_cache(maxsize=1)
def _get_client() -> QdrantClient:
    return QdrantClient(
        url=os.environ["QDRANT_URL"],
        api_key=os.environ["QDRANT_API_KEY"],
        cloud_inference=True,
    )


def search(query: str, top_k: int = 5, threshold: float = 0.70) -> list[str]:
    """Return the corpus chunks relevant to `query`, or [] if none clear the threshold.

    Embeddings are generated server-side by Qdrant Cloud Inference
    (intfloat/multilingual-e5-small) instead of a locally-loaded model.
    query_document()/passage_document() apply the query:/passage: prefixes
    the E5 family requires ourselves, since Cloud Inference doesn't yet do
    it server-side (github.com/qdrant/qdrant/issues/9024, open as of
    2026-05).

    As with the earlier e5-large setup, E5-family cosine scores are
    compressed into a narrow high band regardless of relevance — on this
    corpus, relevant questions scored 0.82-0.90 and irrelevant ones 0.76-
    0.82, so there's no clean cutoff to filter on. 0.70 is deliberately
    loose: a safety net for the "no signal at all" case, not a fine
    relevance filter. Not inventing facts is the system prompt's job, not
    this function's: it's told explicitly to only use what's literally in
    the retrieved fragments.
    """
    collection = os.environ["QDRANT_COLLECTION"]

    response = _get_client().query_points(
        collection_name=collection,
        query=query_document(query),
        limit=top_k,
    )

    return [point.payload["text"] for point in response.points if point.score >= threshold]
