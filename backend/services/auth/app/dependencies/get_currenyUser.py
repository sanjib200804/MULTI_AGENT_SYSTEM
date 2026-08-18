from fastapi import Cookie , HTTPException , Depends ,status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.core.security import decode_token
from app.repositories.user_repositories import UserRepository
from app.schemas.user_schema import UserResponse

async def get_current_user(access_token : str | None = Cookie(default=None),db : Session = Depends(get_db)) ->UserResponse:
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Access token missing!'
        )

    try:
        payload = decode_token(access_token)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid access token!'
        )

    user_id = payload.get('sub')    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token payload!'
        )
    user_repo = UserRepository(db=db)

    user = user_repo.get_by_id(user_id)
    if not user :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found!'
        )

    return UserResponse.model_validate(user)