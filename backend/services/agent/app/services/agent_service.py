import httpx

from workflows.graph import graph
from utils.memory import add_message
from core.settings import settings


def _extract_text(ai_response) -> str:
    """
    Normalize ai_response to a plain string.
    Some models (e.g. Claude) return a list of content blocks:
        [{'type': 'text', 'text': '...', 'extras': {...}}, ...]
    Others (Gemini, Mistral) return a plain string.
    """
    if isinstance(ai_response, str):
        return ai_response
    if isinstance(ai_response, list):
        parts = []
        for block in ai_response:
            if isinstance(block, dict) and block.get("type") == "text":
                parts.append(block.get("text", ""))
            elif isinstance(block, str):
                parts.append(block)
        return "\n".join(parts)
    return str(ai_response) if ai_response else ""


async def agent(
    user_id: str,
    prompt: str,
    conversation_id: str,
    selected_agent: str,
    file=None
):

    file_dict = None
    try:

        async with httpx.AsyncClient() as client:

            response = await client.post(
                f"{settings.CHAT_SERVICE}/chat/save-message",
                json={
                    "conversationId": conversation_id,
                    "role": "user",
                    "content": prompt
                }
            )

            response.raise_for_status()

        if file is not None:
            import os
            import uuid
            temp_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp")
            os.makedirs(temp_dir, exist_ok=True)

            file_extension = os.path.splitext(file.filename)[1]
            temp_file_path = os.path.join(temp_dir, f"{uuid.uuid4()}{file_extension}")

            content = await file.read()
            with open(temp_file_path, "wb") as f:
                f.write(content)

            file_dict = {
                "path": temp_file_path,
                "filename": file.filename,
                "content_type": file.content_type
            }

        result = await graph.ainvoke({
            "prompt": prompt,
            "conversation_id": conversation_id,
            "agent": selected_agent,
            "user_id": user_id,
            "file": file_dict
        })

        print("result:", result)

        ai_text = _extract_text(result.get("ai_response", ""))

        await add_message(
            conversation_id,
            "user",
            prompt
        )

        await add_message(
            conversation_id,
            "assistant",
            ai_text
        )

        async with httpx.AsyncClient() as client:

            response = await client.post(
                f"{settings.CHAT_SERVICE}/chat/save-message",
                json={
                    "conversationId": conversation_id,
                    "role": "assistant",
                    "content": ai_text,
                    "images": result.get("images", []),
                    "artifacts": result.get("artifacts", [])
                }
            )

            response.raise_for_status()

        return {
            "answer": ai_text,
            "images": result.get("images", []),
            "artifacts": result.get("artifacts", [])
        }

    except Exception as error:

        print(f"Agent Controller Error: {error}")

        raise

    finally:
        if file_dict and "path" in file_dict:
            import os
            if os.path.exists(file_dict["path"]):
                try:
                    os.remove(file_dict["path"])
                except Exception as cleanup_error:
                    print(f"Temp file cleanup error in agent service: {cleanup_error}")