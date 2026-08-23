from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr, ConfigDict


class UserBase(BaseModel):
    fullname: str
    email: EmailStr
    avatar : str


class UserCreate(UserBase):
    firebase_id: str


class UserResponse(UserBase):
    id: UUID
    credits : int
    totalCredits : int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class TokenLoginRequest(BaseModel):
    id_token: str

