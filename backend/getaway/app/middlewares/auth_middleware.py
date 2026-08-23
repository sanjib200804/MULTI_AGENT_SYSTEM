from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import decode_token, create_access_token


PUBLIC_PATHS = {
    "/",
    "/health",
    "/docs",
    "/openapi.json",
    "/api/auth/login",
    "/api/auth/logout",
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

        # Public endpoints and CORS preflight OPTIONS requests
        if request.method == "OPTIONS" or path in PUBLIC_PATHS:

            return await call_next(
                request
            )

        # Get tokens from cookies
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        user_id = None
        email = None
        new_access_token = None

        # 1. Attempt to validate access_token
        if access_token:
            try:
                payload = decode_token(access_token)
                if payload.get("type") == "access":
                    user_id = payload.get("sub")
                    email = payload.get("email")
            except ValueError:
                pass  # Token expired or invalid, fall through to refresh_token check

        # 2. Fallback to refresh_token if access_token is missing/expired
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

        # Store user information
        request.state.user_id = user_id
        request.state.user_email = email

        # Continue request
        response = await call_next(
            request
        )

        # If a new access_token was generated from refresh_token, set cookie on response
        if new_access_token:
            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=False,
                samesite="lax",
                max_age=15 * 60,
                path="/"
            )

        return response