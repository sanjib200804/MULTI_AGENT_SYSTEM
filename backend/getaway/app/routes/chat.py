# from fastapi import APIRouter, Request, Response
# import httpx
# from app.core.config import settings

# router = APIRouter(
#     prefix="/api/chat",
#     tags=["Chat"]
# )

# @router.api_route("/{path:path}", methods=["GET", "POST", "PATCH", "DELETE", "PUT"])
# async def proxy_chat(path: str, request: Request):
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

#     async with httpx.AsyncClient() as client:
#         response = await client.request(
#             method=request.method,
#             url=f"{settings.CHAT_SERVICE_URL}/chat/{path}",
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
    prefix="/api/chat",
    tags=["Chat"]
)


@router.api_route(
    "/{path:path}",
    methods=["GET", "POST", "PATCH", "DELETE", "PUT"]
)
async def proxy_chat(path: str, request: Request):

    user_id = getattr(request.state, "user_id", None)
    user_email = getattr(request.state, "user_email", None)

    chat_service_url = settings.CHAT_SERVICE_URL.rstrip("/")

    if not chat_service_url.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=500,
            detail=f"Invalid CHAT_SERVICE_URL: {chat_service_url}"
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

    target_url = f"{chat_service_url}/chat/{path}"

    print(f"CHAT PROXY → {request.method} {target_url}")
    print(f"USER ID → {user_id}")
    print(f"USER EMAIL → {user_email}")

    try:

        async with httpx.AsyncClient(timeout=60.0) as client:

            response = await client.request(
                method=request.method,
                url=target_url,
                headers=headers,
                params=request.query_params,
                content=body
            )

    except httpx.ConnectError as e:

        print(f"CHAT SERVICE CONNECTION ERROR: {e}")

        raise HTTPException(
            status_code=502,
            detail="Unable to connect to Chat Service"
        )

    except httpx.RequestError as e:

        print(f"CHAT SERVICE REQUEST ERROR: {e}")

        raise HTTPException(
            status_code=502,
            detail=f"Chat Service request failed: {str(e)}"
        )

    response_headers = {}

    for key, value in response.headers.items():

        if key.lower() not in {
            "content-length",
            "transfer-encoding",
            "connection"
        }:
            response_headers[key] = value

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=response_headers
    )