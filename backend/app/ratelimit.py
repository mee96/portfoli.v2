import time
from collections import defaultdict, deque
from collections.abc import Callable

from fastapi import Request, WebSocket


class SlidingWindowLimiter:
    """In-memory limiter: at most `limit` hits per `window_seconds` per key.

    State lives in the process, so it resets on every restart and is not shared
    between instances. That is enough for a single free-tier Render service.
    """

    def __init__(
        self,
        limit: int,
        window_seconds: float,
        clock: Callable[[], float] = time.monotonic,
    ) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._clock = clock
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._calls = 0

    def allow(self, key: str) -> bool:
        now = self._clock()
        self._calls += 1
        if self._calls % 500 == 0:
            self._drop_stale(now)

        hits = self._hits[key]
        while hits and now - hits[0] >= self.window_seconds:
            hits.popleft()
        if len(hits) >= self.limit:
            return False

        hits.append(now)
        return True

    def reset(self) -> None:
        self._hits.clear()

    def _drop_stale(self, now: float) -> None:
        for key in [k for k, hits in self._hits.items() if not hits or now - hits[-1] >= self.window_seconds]:
            del self._hits[key]


def client_ip(connection: Request | WebSocket) -> str:
    """Best-effort client address behind Render's proxy.

    X-Forwarded-For can be forged, so a per-IP limit alone can be dodged; the
    callers also apply a global limit that does not depend on this value.
    """
    forwarded = connection.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return connection.client.host if connection.client else "unknown"
