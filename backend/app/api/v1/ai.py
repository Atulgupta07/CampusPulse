from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def ai_chat(request: ChatRequest):
    # Mock AI response
    return ChatResponse(reply=f"AI Response to: {request.message}")
