from fastapi import APIRouter, Depends, HTTPException
from google.cloud.firestore import Client
from app.database.session import get_db
from app.schemas.schemas import UserSettingsResponse, UserSettingsUpdate, DepartmentProfileResponse
from app.auth.permissions import get_current_active_user
from app.models.models import User

router = APIRouter()

@router.get("/me", response_model=UserSettingsResponse)
def get_user_settings(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('settings').document(current_user.id)
    doc = doc_ref.get()
    if not doc.exists:
        default_settings = {
            "user_id": current_user.id,
            "ai_recommendation": True,
            "task_analysis": True,
            "deadline_alert": True,
            "email_notifications": True
        }
        doc_ref.set(default_settings)
        return default_settings
    return doc.to_dict()

@router.put("/me", response_model=UserSettingsResponse)
def update_user_settings(
    settings_in: UserSettingsUpdate,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('settings').document(current_user.id)
    update_data = {k: v for k, v in settings_in.dict(exclude_unset=True).items() if v is not None}
    
    if not doc_ref.get().exists:
        full_data = {
            "user_id": current_user.id,
            "ai_recommendation": True,
            "task_analysis": True,
            "deadline_alert": True,
            "email_notifications": True,
            **update_data
        }
        doc_ref.set(full_data)
        return full_data
        
    doc_ref.update(update_data)
    return doc_ref.get().to_dict()

@router.get("/department", response_model=DepartmentProfileResponse)
def get_department_profile(
    current_user: User = Depends(get_current_active_user)
):
    return {
        "department": "Artificial Intelligence & Machine Learning",
        "institute": "SBJIT Nagpur",
        "platform": "HieraSync AI",
        "purpose": "Organizational Workflow Management",
        "version": "1.0",
        "status": "Active"
    }
