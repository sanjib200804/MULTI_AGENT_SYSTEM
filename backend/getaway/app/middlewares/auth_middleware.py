from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import decode_token


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
        # Get access token
        # ----------------------------------------------------

        access_token = request.cookies.get(
            "access_token"
        )

        if not access_token:
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Authentication required"
                },
            )

        # ----------------------------------------------------
        # Decode access token
        # ----------------------------------------------------

        try:

            payload = decode_token(
                access_token
            )

        except Exception:

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid or expired access token"
                },
            )

        # ----------------------------------------------------
        # Validate token type
        # ----------------------------------------------------

        if payload.get("type") != "access":

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid access token"
                },
            )

        # ----------------------------------------------------
        # Get user
        # ----------------------------------------------------

        user_id = payload.get("sub")
        user_email = payload.get("email")

        if not user_id:

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid access token"
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

        return response