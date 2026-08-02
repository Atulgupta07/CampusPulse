from typing import List, Optional
from datetime import datetime
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Query
from google.cloud.firestore import Client
from app.database.session import get_db
from app.schemas.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.auth.permissions import get_current_active_user
from app.models.models import User

router = APIRouter()

DEFAULT_TASKS = [
    {
        "id": "tsk_1",
        "title": "AI Lab Maintenance",
        "assigned": "Mrs. Neha Gurnani",
        "deadline": "05 August 2026",
        "priority": "High",
        "status": "In Progress",
        "progress": "75%",
        "created_at": "2026-08-01T10:00:00Z"
    },
    {
        "id": "tsk_2",
        "title": "Final Year Project Review",
        "assigned": "Dr. Animesh Tayal",
        "deadline": "10 August 2026",
        "priority": "Medium",
        "status": "Pending Approval",
        "progress": "50%",
        "created_at": "2026-08-01T10:00:00Z"
    },
    {
        "id": "tsk_3",
        "title": "Student Research Tracking",
        "assigned": "Dr. Bhushan Mahendra Manjre",
        "deadline": "15 August 2026",
        "priority": "Low",
        "status": "Completed",
        "progress": "100%",
        "created_at": "2026-08-01T10:00:00Z"
    }
]

@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    priority: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None, alias="status"),
    assigned_to: Optional[str] = Query(None, alias="assigned"),
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    tasks_ref = db.collection('tasks')
    docs = list(tasks_ref.stream())
    tasks = []
    
    if docs:
        for doc in docs:
            data = doc.to_dict()
            if priority and data.get("priority", "").lower() != priority.lower():
                continue
            if status_filter and data.get("status", "").lower() != status_filter.lower():
                continue
            if assigned_to and assigned_to.lower() not in data.get("assigned", "").lower():
                continue
            tasks.append(data)
    else:
        tasks = DEFAULT_TASKS

    return tasks

@router.post("/", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    task_id = str(uuid.uuid4())
    db_task = task.dict()
    db_task['id'] = task_id
    db_task['created_at'] = datetime.utcnow().isoformat()
    
    # Save to Firestore
    db.collection('tasks').document(task_id).set(db_task)
    
    # Audit Log
    log_data = {
        "user_id": current_user.id,
        "user_name": current_user.name,
        "action": f"Task Created: {task.title}",
        "category": "task",
        "details": f"New task '{task.title}' assigned to {task.assigned}",
        "timestamp": datetime.utcnow().isoformat()
    }
    db.collection('activity_logs').document().set(log_data)
    
    return db_task

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: str,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('tasks').document(task_id)
    doc = doc_ref.get()
    if not doc.exists:
        for t in DEFAULT_TASKS:
            if t["id"] == task_id:
                return t
        raise HTTPException(status_code=404, detail="Task not found")
    return doc.to_dict()

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: str,
    task_update: TaskUpdate,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('tasks').document(task_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Task not found")
        
    update_data = {k: v for k, v in task_update.dict(exclude_unset=True).items() if v is not None}
    doc_ref.update(update_data)
    
    return doc_ref.get().to_dict()

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: str,
    db: Client = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    doc_ref = db.collection('tasks').document(task_id)
    if not doc_ref.get().exists:
        raise HTTPException(status_code=404, detail="Task not found")
        
    doc_ref.delete()
    return None

