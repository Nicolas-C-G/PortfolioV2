import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def parse_env_list(value: str, default: list[str] | None = None) -> list[str]:
    if not value:
        return default or []
    return [item.strip() for item in value.split(",") if item.strip()]

CORS_ORIGINS = parse_env_list(
    os.getenv("CORS_ORIGINS", ""),
    default=[""]
)

CORS_METHOD = parse_env_list(
    os.getenv("CORS_METHOD", ""),
    default=[""]
)

CORS_HEADERS = parse_env_list(
    os.getenv("CORS_HEADERS", ""),
    default=[""]
)

app = FastAPI(title="Portfolio Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=CORS_METHOD,
    allow_headers=CORS_HEADERS,
)

@app.get("/")
def read_root():
    return {"message": "Hello world"}