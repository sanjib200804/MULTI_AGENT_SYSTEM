# from fastapi import APIRouter, Request, Response
# import httpx
# from app.core.config import settings

# router = APIRouter(
#     prefix="/api/agent",
#     tags=["Agent"]
# )

# @router.api_route("/{path:path}", methods=["GET", "POST", "PATCH", "DELETE", "PUT"])
# async def proxy_agent(path: str, request: Request):
#     user_id = getattr(request.state, "user_id", None)
#     user_email = getattr(request.state, "user_email", None)

#     headers = {
#         "content-type": request.headers.get("content-type", "application/json")
#     }
#     if user_id is not None:
#         headers["X-User-Id"] = str(user_id)
#     if user_email is not None:
#         headers["X-User-Email"] = user_email

#     query_params = request.query_params

#     body = await request.body()

#     url_path = f"agent/{path}" if path else "agent"

#     async with httpx.AsyncClient(timeout=300.0) as client:
#         response = await client.request(
#             method=request.method,
#             url=f"{settings.AGENT_SERVICE_URL}/{url_path}",
#             headers=headers,
#             params=query_params,
#             content=body
#         )

#     return Response(
#         content=response.content,
#         status_code=response.status_code,
#         headers=dict(response.headers)
#     )


from fastapi import APIRouter, Request, Response, HTTPException
import httpx

from app.core.config import settings


router = APIRouter(
    prefix="/api/agent",
    tags=["Agent"]
)


@router.api_route(
    "/{path:path}",
    methods=["GET", "POST", "PATCH", "DELETE", "PUT"]
)
async def proxy_agent(path: str, request: Request):

    user_id = getattr(request.state, "user_id", None)
    user_email = getattr(request.state, "user_email", None)

    agent_service_url = settings.AGENT_SERVICE_URL.rstrip("/")

    if not agent_service_url.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=500,
            detail="Invalid AGENT_SERVICE_URL"
        )

    headers = {}

    content_type = request.headers.get("content-type")

    if content_type:
        headers["content-type"] = content_type

    if user_id is not None:
        headers["X-User-Id"] = str(user_id)

    if user_email is not None:
        headers["X-User-Email"] = user_email

    body = await request.body()

    url_path = f"agent/{path}" if path else "agent"

    target_url = f"{agent_service_url}/{url_path}"

    print(f"AGENT PROXY → {request.method} {target_url}")

    try:

        async with httpx.AsyncClient(
            timeout=300.0,
            headers={
                "Accept-Encoding": "identity"
            }
        ) as client:

            response = await client.request(
                method=request.method,
                url=target_url,
                headers=headers,
                params=request.query_params,
                content=body
            )

    except httpx.RequestError as e:

        print(f"AGENT SERVICE ERROR: {e}")

        raise HTTPException(
            status_code=502,
            detail="Agent service unavailable"
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get("content-type")
    )