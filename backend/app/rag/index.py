"""Reindex the corpus/ markdown files into Qdrant.

Run manually after touching any corpus/*.md file:

    python -m app.rag.index
"""

import os
import re
from pathlib import Path

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels

from app.rag.embeddings import embed_passages

load_dotenv()

CORPUS_DIR = Path(__file__).resolve().parents[2] / "corpus"
HEADING_RE = re.compile(r"^## (.+)$", re.MULTILINE)


def split_into_chunks(markdown_text: str) -> list[tuple[str, str]]:
    """Split a corpus file into (heading, chunk_text) pairs, one per '## ' section."""
    matches = list(HEADING_RE.finditer(markdown_text))
    chunks: list[tuple[str, str]] = []
    for i, match in enumerate(matches):
        heading = match.group(1).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(markdown_text)
        body = markdown_text[start:end].strip()
        chunk_text = f"{heading}\n\n{body}" if body else heading
        chunks.append((heading, chunk_text))
    return chunks


def load_corpus() -> list[dict]:
    """Read every corpus/*.md file and return its chunks with source metadata."""
    records = []
    for path in sorted(CORPUS_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        for heading, chunk_text in split_into_chunks(text):
            records.append(
                {
                    "source": path.name,
                    "heading": heading,
                    "text": chunk_text,
                }
            )
    return records


def main() -> None:
    collection = os.environ["QDRANT_COLLECTION"]
    client = QdrantClient(
        url=os.environ["QDRANT_URL"],
        api_key=os.environ["QDRANT_API_KEY"],
    )

    records = load_corpus()
    if not records:
        raise RuntimeError(f"No chunks found under {CORPUS_DIR}")

    print(f"Read {len(records)} chunks from {CORPUS_DIR}")

    vectors = embed_passages([record["text"] for record in records])
    vector_size = len(vectors[0])

    if client.collection_exists(collection):
        client.delete_collection(collection)
        print(f"Deleted existing collection '{collection}'")

    client.create_collection(
        collection_name=collection,
        vectors_config=qmodels.VectorParams(size=vector_size, distance=qmodels.Distance.COSINE),
    )
    print(f"Created collection '{collection}' (vector size {vector_size})")

    client.upsert(
        collection_name=collection,
        points=[
            qmodels.PointStruct(
                id=i,
                vector=vector,
                payload=record,
            )
            for i, (record, vector) in enumerate(zip(records, vectors))
        ],
    )

    print(f"Indexed {len(records)} chunks into '{collection}'")


if __name__ == "__main__":
    main()
