from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from .database import Base, engine, get_db
from .models import User, BloodRequest
from .schemas import (
    RegisterRequest, LoginRequest, TokenResponse, UserOut,
    AvailabilityUpdate, BloodRequestCreate, BloodRequestOut
)
from .security import hash_password, verify_password, create_access_token
from .deps import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DonorGO API",
    version="1.0.0",
    description="Blood donation and emergency matching API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DonorGO API is running"}

@app.post("/api/auth/register", response_model=TokenResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.mobile == payload.mobile).first()
    if existing:
        raise HTTPException(status_code=409, detail="Mobile number already registered")

    user = User(
        full_name=payload.full_name,
        mobile=payload.mobile,
        gender=payload.gender,
        date_of_birth=payload.date_of_birth,
        blood_group=payload.blood_group.upper(),
        password_hash=hash_password(payload.password),
        address=payload.address,
        city=payload.city,
        state=payload.state,
        pincode=payload.pincode,
        role=payload.role,
        donor_type=payload.donor_type,
        subscription_status="active",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return TokenResponse(access_token=create_access_token(str(user.id)))

@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mobile == payload.mobile).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid mobile number or password")

    return TokenResponse(access_token=create_access_token(str(user.id)))

@app.get("/api/users/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user

@app.patch("/api/users/me/availability", response_model=UserOut)
def update_availability(
    payload: AvailabilityUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    current_user.is_available = payload.is_available
    db.commit()
    db.refresh(current_user)
    return current_user

@app.get("/api/donors", response_model=List[UserOut])
def find_donors(
    blood_group: Optional[str] = None,
    city: Optional[str] = None,
    state: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(User).filter(
        User.is_available == True,
        User.role.in_(["donor", "both"])
    )

    if blood_group:
        query = query.filter(User.blood_group == blood_group.upper())
    if city:
        query = query.filter(User.city.ilike(f"%{city}%"))
    if state:
        query = query.filter(User.state.ilike(f"%{state}%"))

    return query.order_by(User.created_at.desc()).all()

@app.post("/api/blood-requests", response_model=BloodRequestOut)
def create_blood_request(
    payload: BloodRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    req = BloodRequest(
        requester_id=current_user.id,
        patient_name=payload.patient_name,
        blood_group=payload.blood_group.upper(),
        units=payload.units,
        hospital=payload.hospital,
        city=payload.city,
        state=payload.state,
        contact_number=payload.contact_number,
        urgency=payload.urgency,
        notes=payload.notes,
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req

@app.get("/api/blood-requests", response_model=List[BloodRequestOut])
def list_open_requests(
    blood_group: Optional[str] = None,
    city: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(BloodRequest).filter(BloodRequest.status == "open")
    if blood_group:
        query = query.filter(BloodRequest.blood_group == blood_group.upper())
    if city:
        query = query.filter(BloodRequest.city.ilike(f"%{city}%"))
    return query.order_by(BloodRequest.created_at.desc()).all()

@app.get("/api/blood-requests/mine", response_model=List[BloodRequestOut])
def my_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(BloodRequest)
        .filter(BloodRequest.requester_id == current_user.id)
        .order_by(BloodRequest.created_at.desc())
        .all()
    )

@app.patch("/api/blood-requests/{request_id}/close", response_model=BloodRequestOut)
def close_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    req = db.query(BloodRequest).filter(
        BloodRequest.id == request_id,
        BloodRequest.requester_id == current_user.id
    ).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")

    req.status = "closed"
    db.commit()
    db.refresh(req)
    return req
