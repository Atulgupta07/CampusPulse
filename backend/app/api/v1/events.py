from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud.firestore import Client
from app.database.session import get_db
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import uuid

router = APIRouter()

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: datetime
    end_time: datetime

class EventResponse(EventCreate):
    id: str
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[EventResponse])
def get_events(db: Client = Depends(get_db)):
    events_ref = db.collection('events')
    events = [doc.to_dict() for doc in events_ref.stream()]
    return events

@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Client = Depends(get_db)):
    # Simple conflict check (note: Firestore doesn't support complex range queries easily, this is simplified)
    events_ref = db.collection('events')
    if event.location:
        query = events_ref.where('location', '==', event.location).stream()
        for doc in query:
            doc_data = doc.to_dict()
            # This is a naive check. A real implementation would parse the dates.
            # Assuming start_time and end_time are stored in a compatible way
            if str(doc_data.get('start_time')) < str(event.end_time) and str(doc_data.get('end_time')) > str(event.start_time):
                raise HTTPException(status_code=400, detail="Event location is already booked for this time")

    event_id = str(uuid.uuid4())
    db_event = event.model_dump()
    db_event['id'] = event_id
    db_event['creator_id'] = "anonymous" # Normally from current_user
    
    events_ref.document(event_id).set(db_event)
    return db_event

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: str, event_update: EventCreate, db: Client = Depends(get_db)):
    event_ref = db.collection('events').document(event_id)
    if not event_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")
        
    update_data = event_update.model_dump(exclude_unset=True)
    event_ref.update(update_data)
    
    return event_ref.get().to_dict()

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: str, db: Client = Depends(get_db)):
    event_ref = db.collection('events').document(event_id)
    if not event_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")
    
    event_ref.delete()
    return None
