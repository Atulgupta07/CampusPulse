import firebase_admin
from firebase_admin import credentials, firestore
from app.config.settings import settings

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(settings.FIREBASE_PRIVATE_KEY_PATH)
        firebase_admin.initialize_app(cred, {
            'projectId': settings.FIREBASE_PROJECT_ID
        })
    except Exception as e:
        print(f"Failed to initialize Firebase with certificate: {e}")
        print("Falling back to default credentials.")
        firebase_admin.initialize_app(options={
            'projectId': settings.FIREBASE_PROJECT_ID
        })

db = firestore.client()

def get_db():
    try:
        yield db
    finally:
        pass # Firestore client does not need to be closed like a SQL session
