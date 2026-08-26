from uuid import UUID

from sqlalchemy.orm import Session

from app.models.message_model import MessageModel, MessageRole


class MessageRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        conversation_id: UUID,
        role: MessageRole,
        content: str,
        agent_name: str | None = None,
        message_type: str = "text",
        model_name: str | None = None,
        token_usage: int | None = None,
        images: list | None = None,
        artifacts: list | None = None
    ) -> MessageModel:

        message = MessageModel(
            conversation_id=conversation_id,
            role=role,
            content=content,
            agent_name=agent_name,
            message_type=message_type,
            model_name=model_name,
            token_usage=token_usage,
            images=images or [],
            artifacts=artifacts or []
        )

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def get_by_id(
        self,
        message_id: UUID
    ) -> MessageModel | None:

        return (
            self.db.query(MessageModel)
            .filter(
                MessageModel.id == message_id
            )
            .first()
        )

    def get_by_conversation_id(
        self,
        conversation_id: UUID
    ) -> list[MessageModel]:

        return (
            self.db.query(MessageModel)
            .filter(
                MessageModel.conversation_id == conversation_id
            )
            .order_by(
                MessageModel.created_at.asc()
            )
            .all()
        )

    def delete(
        self,
        message_id: UUID
    ) -> bool:

        message = self.get_by_id(message_id)

        if not message:
            return False

        self.db.delete(message)
        self.db.commit()

        return True