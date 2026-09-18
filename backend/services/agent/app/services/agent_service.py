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

        async with httpx.AsyncClient(timeout=30.0) as client:

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

        try:
            result = await graph.ainvoke({
                "prompt": prompt,
                "conversation_id": conversation_id,
                "agent": selected_agent,
                "user_id": user_id,
                "file": file_dict
            })
            print("result:", result)
            ai_text = _extract_text(result.get("ai_response", ""))
            images = result.get("images", [])
            artifacts = result.get("artifacts", [])
        except Exception as graph_err:
            print(f"Agent Controller Error: {graph_err}")
            err_str = str(graph_err)
            if any(k in err_str for k in ["UNAUTHENTICATED", "401", "ACCESS_TOKEN_TYPE_UNSUPPORTED", "Invalid API Key"]):
                ai_text = (
                    "⚠️ **Authentication Failed (401 UNAUTHENTICATED)**\n\n"
                    "The LLM provider rejected the request because the current `GOOGLE_API_KEY` is invalid or unsupported.\n\n"
                    "**To resolve this:**\n"
                    "1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key (starts with `AIzaSy...`).\n"
                    "2. Open `backend/services/agent/.env` and replace `GOOGLE_API_KEY` with your valid key:\n"
                    "   ```env\n"
                    "   GOOGLE_API_KEY=AIzaSyYourGeneratedKeyHere...\n"
                    "   ```\n"
                    "3. Save the file and submit your message again."
                )
            else:
                ai_text = f"⚠️ **Agent Execution Error**: {err_str}"
            images = []
            artifacts = []

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

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{settings.CHAT_SERVICE}/chat/save-message",
                    json={
                        "conversationId": conversation_id,
                        "role": "assistant",
                        "content": ai_text,
                        "images": images,
                        "artifacts": artifacts
                    }
                )
                response.raise_for_status()
        except Exception as save_err:
            print(f"Warning: Failed to save assistant message to chat-service: {save_err}")

        return {
            "answer": ai_text,
            "images": images,
            "artifacts": artifacts
        }

    except Exception as error:
        print(f"Agent Service Unhandled Error: {error}")
        raise


    finally:
        if file_dict and "path" in file_dict:
            import os
            if os.path.exists(file_dict["path"]):
                try:
                    os.remove(file_dict["path"])
                except Exception as cleanup_error:
                    print(f"Temp file cleanup error in agent service: {cleanup_error}")