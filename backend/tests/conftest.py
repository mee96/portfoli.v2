import pytest

from app import contact
from app.ws import secretari


@pytest.fixture(autouse=True)
def reset_limiters():
    """Limiter state is process-wide; start every test from a clean slate."""
    limiters = (
        secretari.ip_limiter,
        secretari.global_limiter,
        contact.ip_limiter,
        contact.global_limiter,
    )
    for limiter in limiters:
        limiter.reset()
    yield
    for limiter in limiters:
        limiter.reset()
