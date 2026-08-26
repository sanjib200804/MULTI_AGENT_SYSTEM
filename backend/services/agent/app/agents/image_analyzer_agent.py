import base64
from pathlib import Path

from langchain_core.messages import HumanMessage, SystemMessage

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


def extract_text(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        text_parts = []
        for part in content:
            if isinstance(part, str):
                text_parts.append(part)
            elif isinstance(part, dict) and "text" in part:
                text_parts.append(str(part["text"]))
            elif hasattr(part, "text"):
                text_parts.append(str(getattr(part, "text", "")))
        return "".join(text_parts)
    return str(content)


async def image_analyzer(state: AgentState):

    try:
        await check_agent_limit(
            state["user_id"],
            "image"
        )

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

        mime_type = file.get("content_type", "image/jpeg")

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

        response = await llm.ainvoke(
            messages
        )

        await deduct_credits(
            state["user_id"],
            "vision"
        )

        ai_text = extract_text(response.content)

        return {
            **state,
            "ai_response": ai_text,
        }

    except Exception as error:

        print(
            f"Image Analyzer Error: {error}"
        )

        return {
            **state,
            "ai_response": (
                "Failed to analyze the image."
            ),
        }