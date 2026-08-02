from fastapi import APIRouter

router = APIRouter()

@router.get("/export")
def export_report():
    return {"message": "Export feature mocked. Generates PDF/Excel."}
