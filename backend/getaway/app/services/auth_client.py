# import httpx
# from fastapi import Request
# from app.core.config import setting

# class AuthClient:
#     def __init__(self):
#         self.base_url = setting.AUTH_SERVICE_URL


#     async def auth_proxy(self,path: str, request: Request):

#         url = f"{self.base_url}/auth/{path}"

#         body = await request.body()

#         headers = dict(request.headers)

#         async with httpx.AsyncClient() as client:

#             response = await client.request(
#             method=request.method,
#             url=url,
#             content=body,
#             headers=headers
#         )

#         return response.json()

