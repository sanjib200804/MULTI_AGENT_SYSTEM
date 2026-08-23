import httpx
from jose import jwt, JWTError
from services.auth.app.config.db_config import settings
from sqlalchemy.orm import Session 
from services.auth.app.repositories.user_repositories import UserRepository
from services.auth.app.repositories.session_repository import SessionRepository
from services.auth.app.schemas.user_schema import UserCreate , UserResponse
from services.auth.app.core.security import create_access_token ,create_refresh_token , decode_token

GOOGLE_CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken-system@system.gserviceaccount.com"

async def verify_firebase_token(id_token: str, project_id: str) -> dict:
    async with httpx.AsyncClient() as client:
        res = await client.get(GOOGLE_CERTS_URL)
        if res.status_code != 200:
            raise ValueError("Failed to fetch Google public certificates")
        public_certs = res.json()

    issuer = f"https://securetoken.google.com/{project_id}"
    
    try:
        payload = jwt.decode(
            id_token,
            public_certs,
            algorithms=["RS256"],
            audience=project_id,
            issuer=issuer
        )
        return payload
    except JWTError as e:
        raise ValueError(f"Firebase token verification failed: {str(e)}")

class AuthServices:
    def __init__(self , db : Session):
        self.user_repository = UserRepository(db)
        self.session_repository = SessionRepository()

    async def login_with_token(self, id_token: str) -> dict:
        try:
            payload = await verify_firebase_token(id_token, settings.FIREBASE_PROJECT_ID)
        except Exception as e:
            from fastapi import HTTPException
            raise HTTPException(status_code=401, detail=f"Firebase authentication failed: {str(e)}")

        firebase_id = payload.get("sub")
        email = payload.get("email")
        fullname = payload.get("name", "")
        avatar = payload.get("picture", "")

        if not firebase_id or not email:
            from fastapi import HTTPException
            raise HTTPException(status_code=400, detail="Invalid token claims: sub and email are required")

        user = self.user_repository.get_by_firebase_id(firebase_id)
        if not user:
            user = self.user_repository.get_by_email(email)
            if user:
                user.firebase_id = firebase_id
                self.user_repository.db.commit()
            else:
                user_create = UserCreate(
                    fullname=fullname,
                    email=email,
                    avatar=avatar,
                    firebase_id=firebase_id
                )
                user = self.user_repository.create(user_create)

        access_token = create_access_token(user.id, user.email)
        refresh_token = create_refresh_token(user.id, user.email)

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

    

