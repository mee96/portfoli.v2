import logging
import os
from contextlib import asynccontextmanager

import psutil
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.rag.embeddings import warm_up
from app.ws.secretari import router as secretari_router

load_dotenv()

logger = logging.getLogger("uvicorn")


@asynccontextmanager
async def lifespan(app: FastAPI):
    warm_up()
    rss_mb = psutil.Process(os.getpid()).memory_info().rss / (1024 * 1024)
    logger.info(f"Embedding model loaded — process RSS: {rss_mb:.1f} MB")
    yield


app = FastAPI(title="Bunsen backend", lifespan=lifespan)

frontend_origin = os.getenv("FRONTEND_ORIGIN")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin] if frontend_origin else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(secretari_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
