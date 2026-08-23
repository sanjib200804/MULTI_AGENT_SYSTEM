from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.message_schema import MessageResponse


class ConversationCreate(BaseModel):
    title: str | None = Field(
        default="New Chat",
        max_length=255
    )


class ConversationUpdate(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=255
    )


class ConversationResponse(BaseModel):

    id: UUID
    user_id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class ConversationDetailResponse(BaseModel):

    id: UUID
    user_id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

    messages: list[MessageResponse] = []

    model_config = ConfigDict(
        from_attributes=True
    )