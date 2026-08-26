from fastapi import APIRouter, Request, Response
import httpx
from app.core.config import settings

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)




@router.post("/login")
async def login(request: Request):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json"
        )
    }

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/login",
            content=body,
            headers=headers
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get("content-type")
    )

    for cookie in response.headers.get_list("set-cookie"):
        gateway_response.headers.append(
            "set-cookie",
            cookie
        )

    return gateway_response


@router.post("/logout")
async def logout(request: Request):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json"
        )
    }

    if request.headers.get("cookie"):
        headers["cookie"] = request.headers["cookie"]

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/logout",
            content=body,
            headers=headers
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get("content-type")
    )

    for cookie in response.headers.get_list("set-cookie"):
        gateway_response.headers.append(
            "set-cookie",
            cookie
        )

    return gateway_response

@router.post("/refresh")
async def refresh(request: Request):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json"
        )
    }

    if request.headers.get("cookie"):
        headers["cookie"] = request.headers["cookie"]

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/refresh",
            content=body,
            headers=headers
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get("content-type")
    )

    for cookie in response.headers.get_list("set-cookie"):
        gateway_response.headers.append(
            "set-cookie",
            cookie
        )

    return gateway_response

@router.get("/me")
async def get_me(request: Request):

    user_id = getattr(request.state, "user_id", None)
    user_email = getattr(request.state, "user_email", None)

    headers = {}
    if user_id is not None:
        headers["X-User-ID"] = str(user_id)
    if user_email is not None:
        headers["X-User-Email"] = str(user_email)

    cookies = {}
    access_token = request.cookies.get("access_token")
    if access_token:
        cookies["access_token"] = str(access_token)

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{settings.AUTH_SERVICE_URL}/auth/me",
            headers=headers,
            cookies=cookies
        )

    return response.json()