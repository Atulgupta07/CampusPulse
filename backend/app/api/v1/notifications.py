from typing import List, Optional
from datetime import datetime
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud.firestore import Client
from app.database.session import get_db
from app.schemas.schemas import NotificationCreate, NotificationResponse, UnreadCountResponse
from app.auth.permissions import get_current_active_user
from app.models.models import User

router = APIRouter()

DEFAULT_NOTIFICATIONS = [
    {
        "id": "notif_1",
        "title": "New Task Assigned",
        "message": "AI Lab Maintenance task assigned to Mrs. Neha Gurnani",
        "time": "10 minutes ago",
        "type": "Task",
        "icon": "📋",
        "status": "New",
        "is_read": False,
        "created_at": "2026-08-02T22:35:00Z"
    },
    {
        "id": "notif_2",
        "title": "Approval Pending",
        "message": "Final Year Project Review approval is waiting for review",
        "time": "1 hour ago",
        "type": "Approval",
        "icon": "✅",
        "status": "Pending",
        "is_read": False,
        "created_at": "2026-08-02T21:45:00Z"
    },
    {
        "id": "notif_3",
        "title": "Deadline Reminder",
        "message": "Machine Learning Workshop deadline is near",
        "time": "Today",
        "type": "Reminder",
        "icon": "⏰",
        "status": "Important",
        "is_read": False,
        "created_at": "2026-08-02T18:00:00Z"
    },
    {
        "id": "notif_4",
        "title": "Faculty Activity Update",
        "message": "Dr. Bhushan Mahendra Manjre updated research tracking status",
        "time": "Today",
        "type": "Faculty",
        "icon": "👨‍🏫",
        "status": "Updated",
        "is_read": True,
        "created_at": "2026-08-02T15:30:00Z"
    },
    {
        "id": "notif_5",
        "title": "AI Recommendation",
        "message": "HieraSync AI suggested completing pending approvals first",
        "time": "Today",
        "type": "AI",
        "icon": "🤖",
        "status": "AI Alert",
        "is_read": True,
        "created_at": "2026-08-02T12:00:00Z"
    }
]

@router.get("/", response_model=List[NotificationResponse])
def get_notifications(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    notifs_ref = db.collection('notifications')
    docs = list(notifs_ref.where('user_id', 'in', [current_user.id, 'department']).stream())
    notifications = []
    if docs:
        for doc in docs:
            notifications.append(doc.to_dict())
    else:
        notifications = DEFAULT_NOTIFICATIONS
    return notifications

@router.get("/unread-count", response_model=UnreadCountResponse)
def get_unread_count(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    notifs_ref = db.collection('notifications')
    docs = list(notifs_ref.where('user_id', 'in', [current_user.id, 'department']).stream())
    if docs:
        unread = sum(1 for d in docs if not d.to_dict().get("is_read", False))
    else:
        unread = 3  # Default count matching Navbar badge in UI
    return {"unread_count": unread}

@router.put("/{notification_id}/read", response_model=NotificationResponse)
def mark_read(
    notification_id: str,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('notifications').document(notification_id)
    doc = doc_ref.get()
    if not doc.exists:
        for n in DEFAULT_NOTIFICATIONS:
            if n["id"] == notification_id:
                n["is_read"] = True
                return n
        raise HTTPException(status_code=404, detail="Notification not found")
    
    doc_ref.update({"is_read": True})
    return doc_ref.get().to_dict()

@router.put("/read-all")
def mark_all_read(
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    notifs_ref = db.collection('notifications')
    docs = list(notifs_ref.where('user_id', 'in', [current_user.id, 'department']).stream())
    for doc in docs:
        doc.reference.update({"is_read": True})
    return {"message": "All notifications marked as read."}
