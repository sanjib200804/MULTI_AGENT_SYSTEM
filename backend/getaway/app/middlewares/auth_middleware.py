from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import decode_token


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

        # Get access token from cookie
        access_token = request.cookies.get(
            "access_token"
        )

        if not access_token:

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Authentication required"
                }
            )

        # Decode JWT
        try:

            payload = decode_token(
                access_token
            )

        except ValueError:

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid or expired access token"
                }
            )

        # Check access token
        if payload.get("type") != "access":

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid access token"
                }
            )

        user_id = payload.get(
            "sub"
        )

        email = payload.get(
            "email"
        )

        if not user_id:

            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid token payload"
                }
            )

        # Store user information
        request.state.user_id = user_id

        request.state.user_email = email

        # Continue request
        response = await call_next(
            request
        )

        return response