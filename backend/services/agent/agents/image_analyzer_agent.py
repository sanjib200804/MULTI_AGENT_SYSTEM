import base64
from pathlib import Path

from langchain_core.messages import HumanMessage, SystemMessage

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


async def image_analyzer(state: AgentState):

    try:
        # ---------------------------------
        # CHECK AGENT LIMIT
        # ---------------------------------

        await check_agent_limit(
            state["user_id"],
            "image"
        )

        # ---------------------------------
        # GET VISION MODEL
        # ---------------------------------

        llm = await get_llm_model(
            "imageAnalyzer"
        )

        file = state.get("file")
        if not file:
            raise ValueError("No image file was uploaded.")

        image_path = Path(file["path"])

        image_bytes = image_path.read_bytes()

        base64_image = base64.b64encode(
            image_bytes
        ).decode("utf-8")

        # ---------------------------------
        # MIME TYPE
        # ---------------------------------

        mime_type = file.get("content_type", "image/jpeg")

        # ---------------------------------
        # MESSAGES
        # ---------------------------------

        messages = [

            SystemMessage(
                content="""
You are CortexAI Image Analyzer Agent.

Rules:

- Analyze only the uploaded image.
- Answer the user's question accurately.
- If text exists in the image, extract it.
- If charts or tables exist, explain them.
- If something is unclear, say so.
- Use Markdown when helpful.
- Do not hallucinate.
"""
            ),

            HumanMessage(
                content=[
                    {
                        "type": "text",
                        "text": (
                            state.get("prompt")
                            or "Analyze the image"
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": (
                                f"data:{mime_type};"
                                f"base64,{base64_image}"
                            )
                        },
                    },
                ]
            ),
        ]

        # ---------------------------------
        # CALL MODEL
        # ---------------------------------

        response = await llm.ainvoke(
            messages
        )

        # ---------------------------------
        # DEDUCT CREDITS
        # ---------------------------------

        await deduct_credits(
            state["user_id"],
            "vision"
        )

        # ---------------------------------
        # RETURN
        # ---------------------------------

        return {
            **state,
            "ai_response": response.content,
        }

    except Exception as error:

        print(
            f"Image Analyzer Error: {error}"
        )

        return {
            **state,
            "ai_response": (
                "Failed to analyze image"
            ),
        }

    finally:

        # ---------------------------------
        # DELETE TEMP IMAGE
        # ---------------------------------

        try:
            file = state.get("file")
            if file and file.get("path"):
                image_path = Path(file["path"])

                if image_path.exists():
                    image_path.unlink()

        except Exception as cleanup_error:

            print(
                f"Image cleanup error: "
                f"{cleanup_error}"
            )