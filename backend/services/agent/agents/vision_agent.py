import time
from urllib.parse import quote

import httpx

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import checkAgentLimit
from utils.deduct_credits import deduct_credits
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


async def vision_agent(state: AgentState):

    try:

        # ---------------------------------
        # CHECK AGENT LIMIT
        # ---------------------------------

        await checkAgentLimit(
            state.user_id,
            "image"
        )

        # ---------------------------------
        # GET LLM
        # ---------------------------------

        llm = await get_llm_model("image")

        # ---------------------------------
        # GENERATE IMAGE PROMPT
        # ---------------------------------

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
{state.prompt}
"""
        )

        prompt = response.content.strip()

        # ---------------------------------
        # POLLINATIONS IMAGE URL
        # ---------------------------------

        image_url = (
            "https://image.pollinations.ai/prompt/"
            + quote(prompt)
        )

        # ---------------------------------
        # DOWNLOAD IMAGE
        # ---------------------------------

        async with httpx.AsyncClient(
            timeout=120
        ) as client:

            image_response = await client.get(
                image_url
            )

            image_response.raise_for_status()

            image_bytes = image_response.content

        # ---------------------------------
        # DEDUCT CREDITS
        # ---------------------------------

        await deduct_credits(
            state.user_id,
            "vision"
        )

        # ---------------------------------
        # FILE NAME
        # ---------------------------------

        filename = f"image-{int(time.time() * 1000)}.png"

        # ---------------------------------
        # UPLOAD TO S3
        # ---------------------------------

        await upload_to_s3(
            filename=filename,
            file_data=image_bytes,
            content_type="image/png"
        )

        # ---------------------------------
        # GENERATE PRESIGNED URL
        # ---------------------------------

        download_url = await get_from_s3(
            filename,
            24 * 60
        )

        # ---------------------------------
        # RETURN STATE
        # ---------------------------------

        return {
            **state,
            "ai_response": f"""
![Generated Image]({download_url})

📥 [Download Image]({download_url})

⏳ Link expires in 10 minutes.
"""
        }

    except Exception as error:

        print(f"Vision Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate image"
        }