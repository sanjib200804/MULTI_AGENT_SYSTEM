import os
import httpx
from core.settings import settings


async def deduct_credits(user_id : str, agent : str):
    try:
        auth_service = settings.AUTH_SERVICE

        if not auth_service:
            raise ValueError("AUTH_SERVICE is not configured")

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{auth_service}/auth/get_message/{user_id}/{agent}"
            )
            response.raise_for_status()

            return response.json()
    except Exception as error:
        print(f"Error deducting credits: {error}")
        return None

