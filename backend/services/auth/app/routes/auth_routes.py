from fastapi import APIRouter, Request, Response, Depends
from sqlalchemy.orm import Session

from services.auth.app.services.auth_services import AuthServices
from services.auth.app.database.database import get_db
from services.auth.app.schemas.user_schema import UserResponse, UserCreate, TokenLoginRequest
from services.auth.app.dependencies.get_currenyUser import get_current_user

route = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



# LOGIN

@route.post("/login", response_model=UserResponse)
async def login(
    login_data: TokenLoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):

    service = AuthServices(db)

    result = await service.login_with_token(login_data.id_token)

    # Access Token Cookie
    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=False,          
        samesite="lax",
        max_age=15 * 60,
        path="/"
    )

    # Refresh Token Cookie
    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=True,
        secure=False,         
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/"
    )

    # Only user data goes to frontend
    return result["user"]



# LOGOUT

@route.post("/logout")
async def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):

    # Get refresh token from cookie
    refresh_token = request.cookies.get(
        "refresh_token"
    )

    # Revoke refresh token from Redis
    if refresh_token:

        service = AuthServices(db)

        await service.logout(
            refresh_token
        )

    # Delete access token cookie
    response.delete_cookie(
        key="access_token",
        path="/"
    )

    # Delete refresh token cookie
    response.delete_cookie(
        key="refresh_token",
        path="/"
    )

    return {
        "message": "Logout successful"
    }

@route.get("/me")
async def get_me(
    current_user: UserResponse = Depends(get_current_user)
):
    return current_user