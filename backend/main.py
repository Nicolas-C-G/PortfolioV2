import os
from fastapi import FastAPI, HTTPException
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

client = OpenAI(
    api_key = os.getenv("NVIDIA_API_KEY", ""),
    base_url= os.getenv("NVIDIA_BASE_URL", ""),
)

MODEL = os.getenv("NVIDIA_MODEL", "")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": """
                        You are Nicolás Cartes' portfolio assistant.
                        Answer questions about his experience, projects, backend skills,
                        AI projects, infrastructure, and software engineering background.
                        Be clear, concise, and professional.
                    """,
                },
                {
                    "role": "user",
                    "content": req.message,
                },
            ],
            temperature=0.3,
            max_tokens=500,
        )

        return {
            "answer": completion.choices[0].message.content
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

