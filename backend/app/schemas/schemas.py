from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.models import RoleEnum, PriorityEnum, TaskStatusEnum

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: RoleEnum = RoleEnum.FACULTY
    department_id: Optional[str] = "AIML"
    designation: Optional[str] = "Assistant Professor"
    area_of_interest: Optional[str] = None
    joining_date: Optional[str] = "Not Available"
    association: Optional[str] = "Regular"
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    status: str
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class EmployeeResponse(UserBase):
    id: str
    status: str = "ACTIVE"
    
    class Config:
        from_attributes = True

class EmployeeCreate(UserBase):
    password: Optional[str] = "Sbjit@123"

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    designation: Optional[str] = None
    area_of_interest: Optional[str] = None
    joining_date: Optional[str] = None
    association: Optional[str] = None
    role: Optional[RoleEnum] = None
    avatar_url: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

