from fastapi import APIRouter, Request, Response
import httpx

from app.core.config import settings


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


async def copy_set_cookie(
    source_response: httpx.Response,
    target_response: Response,
):

    for cookie in source_response.headers.get_list(
        "set-cookie"
    ):

        target_response.headers.append(
            "set-cookie",
            cookie,
        )


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
async def login(
    request: Request,
):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json",
        ),
    }

    async with httpx.AsyncClient(
        timeout=30.0
    ) as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/login",
            headers=headers,
            content=body,
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get(
            "content-type"
        ),
    )

    await copy_set_cookie(
        response,
        gateway_response,
    )

    return gateway_response


# ============================================================
# REFRESH
# ============================================================

@router.post("/refresh")
async def refresh(
    request: Request,
):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json",
        ),
    }

    # Forward browser cookies
    cookie = request.headers.get("cookie")

    if cookie:
        headers["cookie"] = cookie

    async with httpx.AsyncClient(
        timeout=30.0
    ) as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/refresh",
            headers=headers,
            content=body,
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get(
            "content-type"
        ),
    )

    # Forward new cookies
    await copy_set_cookie(
        response,
        gateway_response,
    )

    return gateway_response


# ============================================================
# LOGOUT
# ============================================================

@router.post("/logout")
async def logout(
    request: Request,
):

    body = await request.body()

    headers = {
        "content-type": request.headers.get(
            "content-type",
            "application/json",
        ),
    }

    cookie = request.headers.get("cookie")

    if cookie:
        headers["cookie"] = cookie

    async with httpx.AsyncClient(
        timeout=30.0
    ) as client:

        response = await client.post(
            f"{settings.AUTH_SERVICE_URL}/auth/logout",
            headers=headers,
            content=body,
        )

    gateway_response = Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get(
            "content-type"
        ),
    )

    await copy_set_cookie(
        response,
        gateway_response,
    )

    return gateway_response


# ============================================================
# ME
# ============================================================

@router.get("/me")
async def get_me(
    request: Request,
):

    user_id = getattr(
        request.state,
        "user_id",
        None,
    )

    user_email = getattr(
        request.state,
        "user_email",
        None,
    )

    headers = {}

    if user_id:
        headers["X-User-ID"] = str(user_id)

    if user_email:
        headers["X-User-Email"] = str(user_email)

    cookie = request.headers.get("cookie")

    if cookie:
        headers["cookie"] = cookie

    async with httpx.AsyncClient(
        timeout=30.0
    ) as client:

        response = await client.get(
            f"{settings.AUTH_SERVICE_URL}/auth/me",
            headers=headers,
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get(
            "content-type"
        ),
    )