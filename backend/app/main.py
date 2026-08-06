import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.rag.embeddings import warm_up
from app.ws.secretari import router as secretari_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Non-blocking: FastAPI finishes starting up immediately while the model
    # loads in the background thread (see embeddings.warm_up). It logs its
    # own RSS reading once loading actually completes.
    warm_up()
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
