import uuid
from datetime import datetime , timezone
from sqlalchemy import (Column , String , DateTime, Integer)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.database import Base


class ConversationModel(Base):
    __tablename__ = 'conversation'

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False,
        index=True
    )

    title = Column(
        String(255),
        nullable=True,
        default='New Chat'
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    messages = relationship(
        "MessageModel",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="MessageModel.created_at"
    )

    