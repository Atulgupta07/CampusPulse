from pydantic import BaseModel, Field
import enum
from datetime import datetime
from typing import Optional

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    PRINCIPAL = "PRINCIPAL"
    HOD = "HOD"
    TEACHER = "TEACHER"
    STUDENT = "STUDENT"

class PriorityEnum(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    URGENT = "URGENT"

class TaskStatusEnum(str, enum.Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    IN_REVIEW = "IN_REVIEW"
    COMPLETED = "COMPLETED"
    OVERDUE = "OVERDUE"

class ApprovalStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED_HOD = "APPROVED_HOD"
    APPROVED_PRINCIPAL = "APPROVED_PRINCIPAL"
    REJECTED = "REJECTED"

class NotificationTypeEnum(str, enum.Enum):
    TASK_ASSIGNED = "TASK_ASSIGNED"
    EVENT_INVITE = "EVENT_INVITE"
    APPROVAL_REQUEST = "APPROVAL_REQUEST"
    SYSTEM_ALERT = "SYSTEM_ALERT"

class User(BaseModel):
    id: str
    name: str
    email: str
    hashed_password: str
    role: RoleEnum = RoleEnum.TEACHER
    department_id: Optional[str] = None
    status: str = "ACTIVE"

class Department(BaseModel):
    id: str
    name: str
    code: str
    hod_id: Optional[str] = None

class Task(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    creator_id: str
    assignee_id: Optional[str] = None
    department_id: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.MEDIUM
    due_date: Optional[datetime] = None
    status: TaskStatusEnum = TaskStatusEnum.TODO
    progress_pct: float = 0.0
    is_recurring: bool = False
    recurrence_pattern: Optional[str] = None
    ai_priority_score: float = 0.0

class Event(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: datetime
    end_time: datetime
    creator_id: str

class Approval(BaseModel):
    id: str
    title: str
    description: str
    requester_id: str
    hod_id: Optional[str] = None
    principal_id: Optional[str] = None
    department_id: Optional[str] = None
    status: str = "PENDING"
    current_stage: str = "HOD_STAGE"
    hod_comment: Optional[str] = None
    principal_comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Notification(BaseModel):
    id: str
    user_id: str
    title: str
    message: str
    type: NotificationTypeEnum = NotificationTypeEnum.SYSTEM_ALERT
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Document(BaseModel):
    id: str
    filename: str
    file_path: str
    uploader_id: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
