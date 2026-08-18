from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class UserBase(BaseModel):
    fullname: str
    email: EmailStr
    avatar : str


class UserCreate(UserBase):
    firebase_id: str


class UserResponse(UserBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

