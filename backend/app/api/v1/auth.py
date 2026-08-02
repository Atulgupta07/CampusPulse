from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.database.session import get_db
from app.schemas.schemas import UserCreate, UserResponse, Token
from app.auth.password import get_password_hash, verify_password
from app.auth.jwt import create_access_token
from datetime import timedelta
from app.config.settings import settings
import firebase_admin
from firebase_admin import auth as firebase_auth
from google.cloud.firestore import Client

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, db: Client = Depends(get_db)):
    # Check if user exists in Firestore
    users_ref = db.collection('users')
    query = users_ref.where('email', '==', user_in.email).stream()
    if list(query):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user in Firebase Auth
    try:
        fb_user = firebase_auth.create_user(
            email=user_in.email,
            password=user_in.password,
            display_name=user_in.name
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    hashed_password = get_password_hash(user_in.password)
    
    # Save user details to Firestore
    user_data = {
        "id": fb_user.uid,
        "name": user_in.name,
        "email": user_in.email,
        "hashed_password": hashed_password,
        "role": user_in.role.value,
        "department_id": user_in.department_id,
        "status": "ACTIVE"
    }
    
    users_ref.document(fb_user.uid).set(user_data)
    
    return user_data

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Client = Depends(get_db)):
    users_ref = db.collection('users')
    query = users_ref.where('email', '==', form_data.username).stream()
    users = list(query)
    
    if not users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_doc = users[0].to_dict()
    
    if not verify_password(form_data.password, user_doc.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_doc["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
