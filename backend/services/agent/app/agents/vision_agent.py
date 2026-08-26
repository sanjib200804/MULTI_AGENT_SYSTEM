import time
from urllib.parse import quote

import httpx

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


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


async def vision_agent(state: AgentState):

    try:

        await check_agent_limit(
            state["user_id"],
            "image"
        )

        llm = await get_llm_model("image")

        response = await llm.ainvoke(
            f"""
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
{state["prompt"]}
"""
        )

        prompt = extract_text(response.content).strip()

        image_url = (
            "https://image.pollinations.ai/prompt/"
            + quote(prompt)
        )

        async with httpx.AsyncClient(
            timeout=120
        ) as client:

            image_response = await client.get(
                image_url
            )

            image_response.raise_for_status()

            image_bytes = image_response.content

        await deduct_credits(
            state["user_id"],
            "vision"
        )

        filename = f"image-{int(time.time() * 1000)}.png"

        await upload_to_s3(
            filename=filename,
            data=image_bytes,
            content_type="image/png"
        )

        download_url = await get_from_s3(
            filename,
            24 * 60
        )

        return {
            **state,
            "images": [download_url],
            "ai_response": f"""
![Generated Image]({download_url})

📥 [Download Image]({download_url})

_Link expires in 24 hours._
"""
        }

    except Exception as error:

        print(f"Vision Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate image",
            "artifacts": []
        }