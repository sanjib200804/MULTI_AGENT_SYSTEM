from fastapi import APIRouter, Request, Response, Depends
from sqlalchemy.orm import Session

from app.services.auth_services import AuthServices
from app.database.database import get_db
from app.schemas.user_schema import UserResponse, UserCreate, TokenLoginRequest
from app.config.db_config import settings
from app.dependencies.get_currenyUser import get_current_user

route = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@route.post("/login", response_model=UserResponse)
async def login(
    user_data: UserCreate,
    response: Response,
    db: Session = Depends(get_db)
):

    service = AuthServices(db)

    result = await service.login(user_data)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=settings.COOKIE_SECURE,          
        samesite="lax",
        max_age=15 * 60,
        path="/"
    )

    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=True,
        secure=settings.COOKIE_SECURE,         
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/"
    )

    return result["user"]



@route.post("/logout")
async def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):

    refresh_token = request.cookies.get(
        "refresh_token"
    )

    if refresh_token:

        service = AuthServices(db)

        await service.logout(
            refresh_token
        )

    response.delete_cookie(
        key="access_token",
        path="/"
    )

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


@route.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Refresh token required")

    service = AuthServices(db)
    result = await service.refresh_access_token(refresh_token)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=15 * 60,
        path="/"
    )

    return {"status": "success", "user": result["user"]}

from uuid import UUID

@route.get("/get_message/{user_id}/{agent}")
async def deduct_user_credits(
    user_id: UUID,
    agent: str,
    db: Session = Depends(get_db)
):
    service = AuthServices(db)
    user = service.user_repository.get_by_id(user_id)
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")

    if user.credit is None:
        user.credit = 100

    user.credit = max(0, user.credit - 1)
    db.commit()
    db.refresh(user)

    return {
        "status": "success",
        "credits": user.credit,
        "totalCredits": user.totalCredits
    }