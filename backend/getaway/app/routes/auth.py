from fastapi import APIRouter, Request, Response
import httpx
from core.config import settings

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

    # Forward cookies from Auth Service -> Browser
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

    # Forward browser Cookie -> Auth Service
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

    # Forward logout Set-Cookie -> Browser
    for cookie in response.headers.get_list("set-cookie"):
        gateway_response.headers.append(
            "set-cookie",
            cookie
        )

    return gateway_response

@router.get("/me")
async def get_me(request: Request):

    user_id = request.state.user_id
    user_email = request.state.user_email

    async with httpx.AsyncClient() as client:

        response = await client.get(
            settings.AUTH_SERVICE_URL,
            headers={
                "X-User-ID": str(user_id),
                "X-User-Email": user_email
            },
            cookies={
                "access_token": request.cookies.get(
                    "access_token"
                )
            }
        )

    return response.json()