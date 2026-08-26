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

    # Authentication
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
}


class AuthMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request: Request,
        call_next,
    ):

        path = request.url.path

        # ----------------------------------------------------
        # Public routes
        # ----------------------------------------------------

        if (
            request.method == "OPTIONS"
            or path in PUBLIC_PATHS
        ):
            return await call_next(request)

        # ----------------------------------------------------
        # Read cookies
        # ----------------------------------------------------

        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        user_id = None
        user_email = None
        new_access_token = None

        if access_token:
            try:
                payload = decode_token(access_token)
                if payload.get("type") == "access":
                    user_id = payload.get("sub")
                    user_email = payload.get("email")
            except Exception:
                pass

        # Fallback to refresh token if access token missing or expired
        if not user_id and refresh_token:
            try:
                ref_payload = decode_token(refresh_token)
                if ref_payload.get("type") == "refresh":
                    user_id = ref_payload.get("sub")
                    user_email = ref_payload.get("email")
                    if user_id and user_email:
                        new_access_token = create_access_token(user_id, user_email)
            except Exception:
                pass

        if not user_id:
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Authentication required"
                },
            )

        # ----------------------------------------------------
        # Store user information
        # ----------------------------------------------------

        request.state.user_id = user_id
        request.state.user_email = user_email

        # ----------------------------------------------------
        # Continue request
        # ----------------------------------------------------

        response = await call_next(request)

        if new_access_token:
            samesite_val = getattr(settings, "COOKIE_SAMESITE", "none")
            secure_val = getattr(settings, "COOKIE_SECURE", True)
            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=secure_val,
                samesite=samesite_val,
                max_age=15 * 60,
                path="/"
            )

        return response