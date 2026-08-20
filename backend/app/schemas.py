from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime

class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    mobile: str = Field(min_length=10, max_length=15)
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None
    blood_group: str
    password: str = Field(min_length=8)
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    role: str = "both"
    donor_type: str = "individual"

class LoginRequest(BaseModel):
    mobile: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    full_name: str
    mobile: str
    gender: Optional[str]
    date_of_birth: Optional[date]
    blood_group: str
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    role: str
    donor_type: str
    is_available: bool
    is_verified: bool
    subscription_status: str

    class Config:
        from_attributes = True

class AvailabilityUpdate(BaseModel):
    is_available: bool

class BloodRequestCreate(BaseModel):
    patient_name: str
    blood_group: str
    units: int = Field(default=1, ge=1, le=20)
    hospital: str
    city: str
    state: Optional[str] = None
    contact_number: str
    urgency: str = "urgent"
    notes: Optional[str] = None

class BloodRequestOut(BloodRequestCreate):
    id: int
    requester_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
