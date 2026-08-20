from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    mobile = Column(String(20), unique=True, nullable=False, index=True)
    gender = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    blood_group = Column(String(5), nullable=False)
    password_hash = Column(String(255), nullable=False)

    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    pincode = Column(String(10), nullable=True)

    role = Column(String(20), default="both")
    donor_type = Column(String(30), default="individual")
    is_available = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    subscription_status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

    requests = relationship("BloodRequest", back_populates="requester")

class BloodRequest(Base):
    __tablename__ = "blood_requests"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    patient_name = Column(String(120), nullable=False)
    blood_group = Column(String(5), nullable=False)
    units = Column(Integer, default=1)
    hospital = Column(String(180), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=True)
    contact_number = Column(String(20), nullable=False)
    urgency = Column(String(20), default="urgent")
    notes = Column(Text, nullable=True)
    status = Column(String(20), default="open")
    created_at = Column(DateTime, default=datetime.utcnow)

    requester = relationship("User", back_populates="requests")
