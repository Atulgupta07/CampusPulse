from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.events import router as events_router
from app.api.v1.tasks import router as tasks_router
from app.api.v1.approvals import router as approvals_router
from app.api.v1.ai import router as ai_router
from app.api.v1.files import router as files_router
from app.api.v1.reports import router as reports_router
from app.api.v1.test import router as test_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(events_router, prefix="/events", tags=["events"])
api_router.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
api_router.include_router(approvals_router, prefix="/approvals", tags=["approvals"])
api_router.include_router(ai_router, prefix="/ai", tags=["ai"])
api_router.include_router(files_router, prefix="/files", tags=["files"])
api_router.include_router(reports_router, prefix="/reports", tags=["reports"])
api_router.include_router(test_router)