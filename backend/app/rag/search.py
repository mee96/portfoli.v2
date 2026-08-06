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


def search(query: str, top_k: int = 5, threshold: float = 0.45) -> list[str]:
    """Return the corpus chunks relevant to `query`, or [] if none clear the threshold.

    With paraphrase-multilingual-MiniLM-L12-v2 (no query:/passage: prefixes,
    unlike e5 models) + cosine similarity, relevant questions score ~0.48-0.80
    while unrelated ones stay under ~0.43, so 0.45 sits in that gap. It's
    still a safety net for the "no signal at all" case, not a fine relevance
    filter — some off-topic-but-adjacent questions can still clear it. Not
    inventing facts is the system prompt's job, not this function's: it's
    told explicitly to only use what's literally in the retrieved fragments.
    """
    vector = embed_query(query)
    collection = os.environ["QDRANT_COLLECTION"]

    response = _get_client().query_points(
        collection_name=collection,
        query=vector,
        limit=top_k,
    )

    return [point.payload["text"] for point in response.points if point.score >= threshold]
