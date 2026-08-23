import httpx

from workflows.graph import graph
from utils.memory import add_message
from core.settings import settings


async def agent(
    user_id: str,
    prompt: str,
    conversation_id: str,
    selected_agent: str,
    file=None
):

    file_dict = None
    try:

        # -----------------------------
        # SAVE USER MESSAGE
        # -----------------------------

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

        # -----------------------------
        # FILE PREPROCESSING
        # -----------------------------

        if file is not None:
            import os
            import uuid
            # Create a temp directory inside the agent service directory
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

        # -----------------------------
        # RUN LANGGRAPH
        # -----------------------------

        result = await graph.ainvoke({
            "prompt": prompt,
            "conversation_id": conversation_id,
            "agent": selected_agent,
            "user_id": user_id,
            "file": file_dict
        })

        print("result:", result)

        # -----------------------------
        # MEMORY
        # -----------------------------

        await add_message(
            conversation_id,
            "user",
            prompt
        )

        await add_message(
            conversation_id,
            "assistant",
            result.get("ai_response", "")
        )

        # -----------------------------
        # SAVE ASSISTANT MESSAGE
        # -----------------------------

        async with httpx.AsyncClient() as client:

            response = await client.post(
                f"{settings.CHAT_SERVICE}/chat/save-message",
                json={
                    "conversationId": conversation_id,
                    "role": "assistant",
                    "content": result.get("ai_response", ""),
                    "images": result.get("images", []),
                    "artifacts": result.get("artifacts", [])
                }
            )

            response.raise_for_status()

        # -----------------------------
        # RESPONSE
        # -----------------------------

        return {
            "answer": result.get("ai_response", ""),
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