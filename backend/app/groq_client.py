import os
from collections.abc import AsyncIterator
from functools import lru_cache

from dotenv import load_dotenv
from groq import AsyncGroq

load_dotenv()

MODEL = "openai/gpt-oss-120b"


@lru_cache(maxsize=1)
def _get_client() -> AsyncGroq:
    return AsyncGroq(api_key=os.environ["GROQ_API_KEY"])


async def stream_completion(messages: list[dict]) -> AsyncIterator[str]:
    """Yield response text chunks from Groq as they arrive, instead of waiting
    for the full completion."""
    stream = await _get_client().chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True,
    )
    async for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield delta
