from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.dependencies.get_current_user import (
    get_current_user_id
)

from app.services.conversation_service import (
    ConversationService
)

from app.services.message_service import (
    MessageService
)

from app.schemas.conversation_schema import (
    ConversationCreate,
    ConversationUpdate,
    ConversationResponse
)

from app.schemas.message_schema import (
    MessageCreate,
    MessageResponse
)

from app.models.message_model import MessageRole


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


# =====================================================
# CONVERSATION
# =====================================================


@router.post(
    "/conversations",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_conversation(
    data: ConversationCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = ConversationService(db)

    try:

        return service.create_conversation(
            user_id=user_id,
            title=data.title
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/conversations",
    response_model=list[ConversationResponse]
)
async def get_conversations(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = ConversationService(db)

    return service.get_user_conversation(
        user_id=user_id
    )


@router.get(
    "/conversations/{conversation_id}",
    response_model=ConversationResponse
)
async def get_conversation(
    conversation_id: UUID,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = ConversationService(db)

    try:

        return service.get_conversation(
            conversation_id=conversation_id,
            user_id=user_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


@router.patch(
    "/conversations/{conversation_id}",
    response_model=ConversationResponse
)
async def update_conversation(
    conversation_id: UUID,
    data: ConversationUpdate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = ConversationService(db)

    try:

        return service.update_title(
            conversation_id=conversation_id,
            user_id=user_id,
            title=data.title
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


@router.delete(
    "/conversations/{conversation_id}"
)
async def delete_conversation(
    conversation_id: UUID,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = ConversationService(db)

    try:

        service.delete_conversation(
            conversation_id=conversation_id,
            user_id=user_id
        )

        return {
            "message": "Conversation deleted successfully"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


# =====================================================
# MESSAGE
# =====================================================


@router.post(
    "/conversations/{conversation_id}/messages",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_message(
    conversation_id: UUID,
    data: MessageCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = MessageService(db)

    try:

        return service.save_msg(
            conversation_id=conversation_id,
            user_id=user_id,
            role=MessageRole.USER,
            content=data.content
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


@router.get(
    "/conversations/{conversation_id}/messages",
    response_model=list[MessageResponse]
)
async def get_messages(
    conversation_id: UUID,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = MessageService(db)

    try:

        return service.get_messages(
            conversation_id=conversation_id,
            user_id=user_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


@router.get(
    "/messages/{message_id}",
    response_model=MessageResponse
)
async def get_message(
    message_id: UUID,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = MessageService(db)

    try:

        return service.get_message(
            message_id=message_id,
            user_id=user_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


@router.delete(
    "/messages/{message_id}"
)
async def delete_message(
    message_id: UUID,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    service = MessageService(db)

    try:

        service.delete_message(
            message_id=message_id,
            user_id=user_id
        )

        return {
            "message": "Message deleted successfully"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except PermissionError as e:

        raise HTTPException(
            status_code=403,
            detail=str(e)
        )


