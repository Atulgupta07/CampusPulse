from fastapi import APIRouter, Depends
from app.database.session import get_db

router = APIRouter(prefix="/test", tags=["Test"])


@router.get("/firebase")
def test_firebase(db=Depends(get_db)):
    db.collection("test").document("connection").set({
        "status": "Connected",
        "message": "CampusPulse Firebase is working!"
    })

    return {
        "success": True,
        "message": "Data written to Firestore successfully!"
    }