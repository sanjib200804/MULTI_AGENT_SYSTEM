from uuid import UUID
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.models.message_model import MessageRole


class MessageCreate(BaseModel):

    role: MessageRole

    content: str = Field(
        ...,
        min_length=1
    )

    agent_name: str | None = None

    message_type: str = "text"

    model_name: str | None = None

    token_usage: int | None = None

    images: list[Any] | None = None

    artifacts: list[Any] | None = None


class MessageResponse(BaseModel):

    id: UUID

    conversation_id: UUID

    role: MessageRole

    content: str

    agent_name: str | None = None

    message_type: str

    model_name: str | None = None

    token_usage: int | None = None

    images: list[Any] | None = None

    artifacts: list[Any] | None = None

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )