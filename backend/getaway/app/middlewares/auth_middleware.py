from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import settings
from app.core.security import decode_token, create_access_token


PUBLIC_PATHS = {
    "/",
    "/health",
    "/docs",
    "/openapi.json",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
}


class AuthMiddleware(
    BaseHTTPMiddleware
):

    async def dispatch(
        self,
        request: Request,
        call_next
    ):

        path = request.url.path

        if request.method == "OPTIONS" or path in PUBLIC_PATHS:

            return await call_next(
                request
            )

        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        user_id = None
        email = None
        new_access_token = None

        if access_token:
            try:
                payload = decode_token(access_token)
                if payload.get("type") == "access":
                    user_id = payload.get("sub")
            except ValueError:
                pass

        if not user_id and refresh_token:
            try:
                ref_payload = decode_token(refresh_token)
                if ref_payload.get("type") == "refresh":
                    user_id = ref_payload.get("sub")
                    email = ref_payload.get("email")
                    if user_id and email:
                        new_access_token = create_access_token(user_id, email)
            except ValueError:
                pass

        if not user_id:
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Authentication required"
                }
            )

        request.state.user_id = user_id
        request.state.user_email = email

        response = await call_next(
            request
        )

        if new_access_token:
            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=settings.COOKIE_SECURE,
                samesite=settings.COOKIE_SAMESITE,
                max_age=15 * 60,
                path="/"
            )

        return response