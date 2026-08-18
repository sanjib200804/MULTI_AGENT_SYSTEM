from fastapi import APIRouter, Request, Response
import httpx
from app.core.config import settings

router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

@router.api_route("/{path:path}", methods=["GET", "POST", "PATCH", "DELETE", "PUT"])
async def proxy_chat(path: str, request: Request):
    user_id = getattr(request.state, "user_id", None)
    user_email = getattr(request.state, "user_email", None)

    headers = {
        "content-type": request.headers.get("content-type", "application/json")
    }
    if user_id is not None:
        headers["X-User-Id"] = str(user_id)
    if user_email is not None:
        headers["X-User-Email"] = user_email

    # Forward query parameters
    query_params = request.query_params

    # Read body
    body = await request.body()

    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=f"{settings.CHAT_SERVICE_URL}/chat/{path}",
            headers=headers,
            params=query_params,
            content=body
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )
