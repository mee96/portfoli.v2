import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.ws.secretari import router as secretari_router

load_dotenv()

app = FastAPI(title="Bunsen backend")

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
