from sqlalchemy.orm import Session 
from app.repositories.user_repositories import UserRepository
from app.repositories.session_repository import SessionRepository
from app.schemas.user_schema import UserCreate , UserResponse
from app.core.security import create_access_token ,create_refresh_token , decode_token

class AuthServices:
    def __init__(self , db : Session):
        self.user_repository = UserRepository(db)
        self.session_repository = SessionRepository()

    async def login(self, user_data:UserCreate)-> UserResponse:
        user = self.user_repository.get_by_firebase_id(user_data.firebase_id)
        if not user : 
            user = self.user_repository.get_by_email(user_data.email)
        if not user:
            user = self.user_repository.create(user_data=user_data)    

        access_token = create_access_token(user.id,user.email)

        refresh_token = create_refresh_token(user.id,user.email)

        await self.session_repository.save_refresh_token(
            user_id=user.id,
            refresh_token=refresh_token,
            expire_seconds=7 * 24 * 60 * 60 * 1000
        )

        return {
            "user": UserResponse.model_validate(user),
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    async def logout(self, refresh_token: str):

     # Decode refresh token and get user ID
     try:
         payload = decode_token(refresh_token)

         user_id = (payload.get("sub"))

     except Exception:
         # Even if token is invalid/expired,
         # logout should still succeed.
         return {
            "message": "Logout successful"
        }

     # Remove refresh token from Redis
     await self.session_repository.delete_refresh_token(
        user_id
    )

     return {
        "message": "Logout successful"
    }

    

