from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud.firestore import Client
from app.database.session import get_db
from pydantic import BaseModel
from typing import List, Optional
import enum
import uuid

router = APIRouter()

class ApprovalStage(str, enum.Enum):
    HOD_STAGE = "HOD_STAGE"
    PRINCIPAL_STAGE = "PRINCIPAL_STAGE"
    COMPLETED = "COMPLETED"

class ApprovalStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED_BY_HOD = "APPROVED_BY_HOD"
    APPROVED_BY_PRINCIPAL = "APPROVED_BY_PRINCIPAL"
    REJECTED = "REJECTED"

class ApprovalCreate(BaseModel):
    title: str
    description: str
    requester_id: str
    hod_id: Optional[str] = None
    principal_id: Optional[str] = None

class ApprovalUpdate(BaseModel):
    status: ApprovalStatus
    comment: Optional[str] = None

class ApprovalResponse(ApprovalCreate):
    id: str
    current_stage: ApprovalStage
    status: ApprovalStatus
    hod_comment: Optional[str] = None
    principal_comment: Optional[str] = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ApprovalResponse])
def get_approvals(db: Client = Depends(get_db)):
    approvals_ref = db.collection('approvals')
    approvals = [doc.to_dict() for doc in approvals_ref.stream()]
    return approvals

@router.post("/", response_model=ApprovalResponse)
def create_approval(approval: ApprovalCreate, db: Client = Depends(get_db)):
    approval_id = str(uuid.uuid4())
    db_approval = approval.model_dump()
    db_approval['id'] = approval_id
    db_approval['current_stage'] = ApprovalStage.HOD_STAGE.value
    db_approval['status'] = ApprovalStatus.PENDING.value
    
    db.collection('approvals').document(approval_id).set(db_approval)
    return db_approval

@router.put("/{approval_id}/review", response_model=ApprovalResponse)
def review_approval(approval_id: str, review: ApprovalUpdate, db: Client = Depends(get_db)):
    approval_ref = db.collection('approvals').document(approval_id)
    doc = approval_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Approval request not found")
        
    db_approval = doc.to_dict()
    db_approval['status'] = review.status.value
    
    if review.status == ApprovalStatus.APPROVED_BY_HOD:
        db_approval['current_stage'] = ApprovalStage.PRINCIPAL_STAGE.value
        db_approval['hod_comment'] = review.comment
    elif review.status == ApprovalStatus.APPROVED_BY_PRINCIPAL:
        db_approval['current_stage'] = ApprovalStage.COMPLETED.value
        db_approval['principal_comment'] = review.comment
    elif review.status == ApprovalStatus.REJECTED:
        db_approval['current_stage'] = ApprovalStage.COMPLETED.value
        if db_approval.get('current_stage') == ApprovalStage.HOD_STAGE.value:
            db_approval['hod_comment'] = review.comment
        else:
            db_approval['principal_comment'] = review.comment

    approval_ref.update(db_approval)
    return db_approval
