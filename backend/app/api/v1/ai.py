from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends
from google.cloud.firestore import Client
from app.database.session import get_db
from app.schemas.schemas import AIChatRequest, AIChatResponse, AIDashboardSummaryResponse, AIReportResponse
from app.auth.permissions import get_current_active_user
from app.models.models import User

router = APIRouter()

@router.post("/chat", response_model=AIChatResponse)
def ai_chat(
    req: AIChatRequest,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    msg = req.message.lower()
    
    if "approval" in msg or "pending" in msg:
        reply = "There are 6 pending approvals. AI recommends reviewing project approvals first."
    elif "priority" in msg or "task" in msg:
        reply = "AI detected AI Lab Maintenance and Project Review as high priority activities."
    elif "summary" in msg or "department" in msg:
        reply = "AIML Department has 14 faculty members, 24 active tasks and 85% workflow efficiency."
    else:
        reply = f"HieraSync AI analyzed your request regarding '{req.message}'. All systems in AIML Department are operating efficiently."
        
    # Save chat history to Firestore
    chat_doc = {
        "user_id": current_user.id,
        "user_message": req.message,
        "ai_response": reply,
        "created_at": datetime.utcnow().isoformat()
    }
    db.collection('ai_chats').document().set(chat_doc)

    return {"user": req.message, "ai": reply}

@router.get("/dashboard-summary", response_model=AIDashboardSummaryResponse)
def get_ai_dashboard_summary(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return {
        "greeting": f"Good Morning, {current_user.name} 👋",
        "insights": [
            "⚡ 2 Tasks may miss deadline",
            "📅 Meeting with HOD at 3 PM",
            "📈 Productivity Score : 92%",
            "✅ Complete pending approvals first"
        ],
        "productivity_score": "92%"
    }

@router.post("/generate-report", response_model=AIReportResponse)
def generate_ai_report(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return {
        "title": "HieraSync AI Departmental Performance Report",
        "summary": "AI analysis shows AIML department workflow efficiency is high (92%). 24 tasks completed successfully with 8 tasks in progress.",
        "recommendations": [
            "Review high-priority project approvals first",
            "Monitor AI Lab Maintenance task due August 5",
            "Schedule project review meetings before upcoming workshops"
        ],
        "generated_at": datetime.utcnow().isoformat()
    }

@router.get("/calendar-insights")
def get_calendar_insights(
    current_user: User = Depends(get_current_active_user)
):
    return {
        "insight": "AI predicts upcoming deadlines and recommends scheduling project reviews before important activities."
    }

@router.get("/approval-suggestions")
def get_approval_suggestions(
    current_user: User = Depends(get_current_active_user)
):
    return {
        "suggestion": "AI recommends reviewing high priority project approvals first and completing pending department requests before deadlines."
    }

@router.post("/notification-summary")
def get_notification_summary(
    current_user: User = Depends(get_current_active_user)
):
    return {
        "summary": "AI analyzed department activities: 3 pending approvals require attention, and 1 high priority task deadline is near."
    }

