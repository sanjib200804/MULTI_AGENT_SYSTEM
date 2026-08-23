from fastapi import APIRouter, Request, Response
import httpx
from app.core.config import settings

router = APIRouter(
    prefix="/api/agent",
    tags=["Agent"]
)

@router.api_route("/{path:path}", methods=["GET", "POST", "PATCH", "DELETE", "PUT"])
async def proxy_agent(path: str, request: Request):
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

    # Construct destination URL path relative to agent service
    url_path = f"agent/{path}" if path else "agent"

    async with httpx.AsyncClient(timeout=300.0) as client:
        response = await client.request(
            method=request.method,
            url=f"{settings.AGENT_SERVICE_URL}/{url_path}",
            headers=headers,
            params=query_params,
            content=body
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )
