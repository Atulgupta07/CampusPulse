from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud.firestore import Client
from app.database.session import get_db
from app.models.models import PriorityEnum, TaskStatusEnum
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import uuid

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.MEDIUM
    due_date: Optional[datetime] = None
    assignee_id: Optional[str] = None
    department_id: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    status: Optional[TaskStatusEnum] = None
    progress_pct: Optional[float] = None
    assignee_id: Optional[str] = None

class TaskResponse(TaskCreate):
    id: str
    status: TaskStatusEnum
    progress_pct: float
    creator_id: Optional[str] = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[TaskResponse])
def get_tasks(db: Client = Depends(get_db)):
    tasks_ref = db.collection('tasks')
    tasks = [doc.to_dict() for doc in tasks_ref.stream()]
    return tasks

@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Client = Depends(get_db)):
    task_id = str(uuid.uuid4())
    task_data = task.model_dump()
    task_data['id'] = task_id
    task_data['status'] = TaskStatusEnum.TODO.value
    task_data['progress_pct'] = 0.0
    task_data['creator_id'] = "anonymous" # Normally from current_user
    
    # Convert datetime to string or let firestore handle it
    
    db.collection('tasks').document(task_id).set(task_data)
    return task_data

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task_update: TaskUpdate, db: Client = Depends(get_db)):
    task_ref = db.collection('tasks').document(task_id)
    doc = task_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Task not found")
        
    update_data = task_update.model_dump(exclude_unset=True)
    
    # Ensure enum values are saved as strings
    for k, v in update_data.items():
        if isinstance(v, (PriorityEnum, TaskStatusEnum)):
            update_data[k] = v.value

    task_ref.update(update_data)
    
    updated_doc = task_ref.get().to_dict()
    return updated_doc

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str, db: Client = Depends(get_db)):
    task_ref = db.collection('tasks').document(task_id)
    if not task_ref.get().exists:
        raise HTTPException(status_code=404, detail="Task not found")
        
    task_ref.delete()
    return None
