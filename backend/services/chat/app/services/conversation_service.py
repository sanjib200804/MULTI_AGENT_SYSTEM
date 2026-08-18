from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.conversation_repository import (
    ConversationRepository
)

from app.schemas.conversation_schema import (
    ConversationResponse
)


class ConversationService:

    def __init__(self, db: Session):

        self.conversation_repository = (
            ConversationRepository(db=db)
        )


    # Create Conversation

    def create_conversation(
        self,
        user_id: int,
        title: str | None = None
    ) -> ConversationResponse:

        if not user_id:
            raise ValueError(
                "User ID is required"
            )

        conversation = (
            self.conversation_repository
            .create_conversation(
                user_id=user_id,
                title=title
            )
        )

        return ConversationResponse.model_validate(
            conversation
        )


    # Get Conversation

    def get_conversation(
        self,
        conversation_id: UUID,
        user_id: int
    ) -> ConversationResponse:

        conversation = (
            self.conversation_repository
            .get_conservation_id(
                conversation_id=conversation_id
            )
        )

        if not conversation:
            raise ValueError(
                "Conversation not found"
            )

        if conversation.user_id != user_id:
            raise PermissionError(
                "You don't have access to this conversation"
            )

        return ConversationResponse.model_validate(
            conversation
        )


    # Get User Conversations

    def get_user_conversation(
        self,
        user_id: int
    ) -> list[ConversationResponse]:

        conversations = (
            self.conversation_repository
            .get_by_userId(
                user_id=user_id
            )
        )

        return [
            ConversationResponse.model_validate(
                conversation
            )
            for conversation in conversations
        ]


    # Update Title

    def update_title(
        self,
        conversation_id: UUID,
        user_id: int,
        title: str
    ) -> ConversationResponse:

        # Check ownership
        self.get_conversation(
            conversation_id=conversation_id,
            user_id=user_id
        )

        if not title or not title.strip():
            raise ValueError(
                "Conversation title cannot be empty!"
            )

        conversation = (
            self.conversation_repository
            .update_title(
                conversation_id=conversation_id,
                title=title.strip()
            )
        )

        if not conversation:
            raise ValueError(
                "Conversation not found"
            )

        return ConversationResponse.model_validate(
            conversation
        )


    # Delete Conversation

    def delete_conversation(
        self,
        conversation_id: UUID,
        user_id: int
    ) -> bool:

        # Check ownership
        self.get_conversation(
            conversation_id=conversation_id,
            user_id=user_id
        )

        deleted = (
            self.conversation_repository
            .delete_conversation(
                conversation_id=conversation_id
            )
        )

        if not deleted:
            raise ValueError(
                "Conversation could not be deleted!"
            )

        return True

    