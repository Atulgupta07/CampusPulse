import firebase_admin
from firebase_admin import credentials, firestore
from app.config.settings import settings
from app.utils.logging import logger
from fastapi import HTTPException, status
import os

db = None

def init_firebase():
    global db
    if not firebase_admin._apps:
        try:
            if os.path.exists(settings.FIREBASE_PRIVATE_KEY_PATH):
                logger.info(f"Initializing Firebase with certificate at {settings.FIREBASE_PRIVATE_KEY_PATH}")
                cred = credentials.Certificate(settings.FIREBASE_PRIVATE_KEY_PATH)
                firebase_admin.initialize_app(cred, {
                    'projectId': settings.FIREBASE_PROJECT_ID
                })
                db = firestore.client()
            else:
                logger.warning(f"Certificate not found at {settings.FIREBASE_PRIVATE_KEY_PATH}. Falling back to default credentials.")
                firebase_admin.initialize_app(options={
                    'projectId': settings.FIREBASE_PROJECT_ID
                })
                db = firestore.client()
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            db = None

init_firebase()

def get_db():
    if db is None:
        logger.error("Firestore database is not initialized.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is temporarily unavailable."
        )
    yield db
