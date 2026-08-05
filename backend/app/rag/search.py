import os
from functools import lru_cache

from dotenv import load_dotenv
from qdrant_client import QdrantClient

from app.rag.embeddings import embed_query

load_dotenv()


@lru_cache(maxsize=1)
def _get_client() -> QdrantClient:
    return QdrantClient(
        url=os.environ["QDRANT_URL"],
        api_key=os.environ["QDRANT_API_KEY"],
    )


def search(query: str, top_k: int = 5, threshold: float = 0.72) -> list[str]:
    """Return the corpus chunks relevant to `query`, or [] if none clear the threshold.

    With multilingual-e5-large + cosine similarity, unrelated questions still
    land in the 0.71-0.79 range, so this threshold is deliberately loose — a
    safety net for the "no signal at all" case, not a fine relevance filter
    (empirically, no clean cutoff separates relevant from irrelevant on this
    corpus). Not inventing facts is the system prompt's job, not this
    function's: it's told explicitly to only use what's literally in the
    retrieved fragments.
    """
    vector = embed_query(query)
    collection = os.environ["QDRANT_COLLECTION"]

    response = _get_client().query_points(
        collection_name=collection,
        query=vector,
        limit=top_k,
    )

    return [point.payload["text"] for point in response.points if point.score >= threshold]
