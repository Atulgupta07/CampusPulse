from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.scheduler.jobs import start_scheduler, stop_scheduler
from app.utils.logging import logger
from fastapi.responses import JSONResponse
import sys
from contextlib import asynccontextmanager
from google.api_core.exceptions import GoogleAPICallError, RetryError

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting CampusPulse API...")
    start_scheduler()
    yield
    stop_scheduler()
    logger.info("CampusPulse API shutdown complete.")

app = FastAPI(
    title="CampusPulse API",
    description="Smart College Workflow & Event Management System API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.exception_handler(GoogleAPICallError)
async def google_api_exception_handler(request: Request, exc: GoogleAPICallError):
    logger.error(f"Google API Error: {exc}")
    return JSONResponse(
        status_code=503,
        content={"message": "Service temporarily unavailable due to backend failure."}
    )

@app.exception_handler(RetryError)
async def google_retry_exception_handler(request: Request, exc: RetryError):
    logger.error(f"Google API Retry Error: {exc}")
    return JSONResponse(
        status_code=503,
        content={"message": "Service temporarily unavailable due to backend failure."}
    )

@app.get("/")
async def root():
    return {"message": "Welcome to CampusPulse API"}
