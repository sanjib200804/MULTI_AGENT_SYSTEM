from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.message_repository import MessageRepository
from app.repositories.conversation_repository import ConversationRepository

from app.models.message_model import MessageRole

from app.schemas.message_schema import MessageResponse


class MessageService:

    def __init__(self, db: Session):

        self.message_repository = MessageRepository(
            db=db
        )

        self.conversation_repository = ConversationRepository(
            db=db
        )

    # =========================
    # Save Message
    # =========================

    def save_msg(
        self,
        conversation_id: UUID,
        user_id: UUID,
        role: MessageRole,
        content: str
    ) -> MessageResponse:

        conversation = (
            self.conversation_repository
            .get_conservation_id(
                conversation_id
            )
        )

        if not conversation:
            raise ValueError(
                "Conversation not found!"
            )

        # Check ownership
        if conversation.user_id != user_id:
            raise PermissionError(
                "You don't have access to this conversation!"
            )

        # Validate message
        if not content or not content.strip():
            raise ValueError(
                "Message content cannot be empty!"
            )

        message = (
            self.message_repository.create(
                conversation_id=conversation_id,
                role=role,
                content=content.strip()
            )
        )

        return MessageResponse.model_validate(
            message
        )

    # =========================
    # Get Single Message
    # =========================

    def get_message(
        self,
        message_id: UUID,
        user_id: UUID
    ) -> MessageResponse:

        message = (
            self.message_repository
            .get_by_id(message_id)
        )

        if not message:
            raise ValueError(
                "Message not found"
            )

        conversation = (
            self.conversation_repository
            .get_by_id(
                message.conversation_id
            )
        )

        if not conversation:
            raise ValueError(
                "Conversation not found"
            )

        # Check ownership
        if conversation.user_id != user_id:
            raise PermissionError(
                "You don't have access to this message"
            )

        return MessageResponse.model_validate(
            message
        )

    # =========================
    # Get All Messages
    # =========================

    def get_messages(
        self,
        conversation_id: UUID,
        user_id: UUID
    ) -> list[MessageResponse]:

        conversation = (
            self.conversation_repository
            .get_by_id(
                conversation_id
            )
        )

        if not conversation:
            raise ValueError(
                "Conversation not found"
            )

        # Check ownership
        if conversation.user_id != user_id:
            raise PermissionError(
                "You don't have access to this conversation"
            )

        messages = (
            self.message_repository
            .get_by_conversation_id(
                conversation_id
            )
        )

        return [
            MessageResponse.model_validate(message)
            for message in messages
        ]

    # =========================
    # Delete Message
    # =========================

    def delete_message(
        self,
        message_id: UUID,
        user_id: UUID
    ) -> bool:

        # Check ownership
        self.get_message(
            message_id=message_id,
            user_id=user_id
        )

        deleted = (
            self.message_repository
            .delete(message_id)
        )

        if not deleted:
            raise ValueError(
                "Message could not be deleted!"
            )

        return True