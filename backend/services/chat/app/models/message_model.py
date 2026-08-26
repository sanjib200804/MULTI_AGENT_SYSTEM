import uuid
from enum import Enum
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    DateTime,
    ForeignKey,
    JSON,
    Enum as SQLEnum
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.database import Base

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class MessageModel(Base):
    __tablename__ = 'message'

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True
    )

    conversation_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "conversation.id",
            ondelete='CASCADE'
        ),
        nullable=False,
        index=True
    )

    role = Column(SQLEnum(MessageRole), nullable=False, index=True)

    content = Column(Text, nullable=False)

    agent_name = Column(String(255), nullable=True)

    message_type = Column(String(50), nullable=False, default="text")

    model_name = Column(String(255), nullable=True)

    token_usage = Column(Integer, nullable=True)

    images = Column(JSON, nullable=True, default=list)

    artifacts = Column(JSON, nullable=True, default=list)

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        index=True
    )

    conversation = relationship(
        "ConversationModel",
        back_populates="messages"
    )