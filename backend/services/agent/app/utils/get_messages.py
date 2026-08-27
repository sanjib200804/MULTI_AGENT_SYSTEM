import os
import httpx
from dotenv import load_dotenv
from core.settings import settings
load_dotenv()


async def get_messages(conversation_id: str):
    try:
        chat_service = settings.CHAT_SERVICE

        if not chat_service:
            raise ValueError("CHAT_SERVICE is not configured")

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{chat_service}/chat/get-messages/{conversation_id}"
            )

            response.raise_for_status()

            return response.json()

    except Exception as error:
        print(f"Error getting messages: {error}")
        return None