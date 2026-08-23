import json
import uuid

from core.state import AgentState
from config.llmModels import get_llm_model

from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits
from utils.generate_ppt import generate_ppt
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


async def ppt_agent(state: AgentState):

    try:

        # --------------------------------
        # CHECK LIMIT
        # --------------------------------

        await check_agent_limit(
            state["user_id"],
            "ppt"
        )

        # --------------------------------
        # GET MODEL
        # --------------------------------

        llm = await get_llm_model("ppt")

        # --------------------------------
        # GENERATE PPT CONTENT
        # --------------------------------

        prompt = f"""
You are a professional presentation designer.

Return ONLY valid JSON.

Format:

{{
    "title": "",
    "subtitle": "",
    "slides": [
        {{
            "title": "",
            "points": [
                "",
                "",
                "",
                ""
            ]
        }}
    ]
}}

Rules:

- Generate exactly 6 content slides.
- Each slide should have 4-6 concise bullet points.
- No markdown.
- No explanation.
- No code block.
- Return ONLY JSON.

Topic:

{state["prompt"]}
"""

        # IMPORTANT: async model call
        response = await llm.ainvoke(prompt)

        # --------------------------------
        # PARSE JSON
        # --------------------------------

        content = response.content.strip()

        # Remove accidental markdown fences
        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        data = json.loads(content)

        # --------------------------------
        # VALIDATE BASIC STRUCTURE
        # --------------------------------

        if not data.get("title"):
            raise ValueError("PPT title is missing")

        if not data.get("slides"):
            raise ValueError("PPT slides are missing")

        if len(data["slides"]) != 6:
            raise ValueError("PPT must contain exactly 6 content slides")

        # --------------------------------
        # GENERATE PPTX
        # --------------------------------

        ppt_buffer = await generate_ppt(data)

        # --------------------------------
        # FILE NAME
        # --------------------------------

        filename = f"ppt-{uuid.uuid4()}.pptx"

        # --------------------------------
        # UPLOAD TO S3
        # --------------------------------

        content_type = (
            "application/vnd.openxmlformats-officedocument."
            "presentationml.presentation"
        )

        await upload_to_s3(
            filename=filename,
            data=ppt_buffer,
            content_type=content_type
        )

        # --------------------------------
        # DOWNLOAD URL
        # --------------------------------

        download_url = await get_from_s3(
            filename,
            24 * 60 * 60
        )

        # --------------------------------
        # DEDUCT CREDIT
        # --------------------------------

        await deduct_credits(
            state["user_id"],
            "ppt"
        )

        # --------------------------------
        # RETURN STATE
        # --------------------------------

        return {
            **state,

            "ai_response": f"""# ✅ Presentation Generated

**{data["title"]}**

📥 [Download PPT]({download_url})

_Link expires in 24 hours._
""",

            "artifacts": [
                {
                    "id": str(uuid.uuid4()),
                    "type": "ppt",
                    "title": data["title"],
                    "filename": filename,
                    "download_url": download_url
                }
            ]
        }

    except json.JSONDecodeError as error:

        print(f"PPT JSON parsing error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate valid PPT data.",
            "artifacts": []
        }

    except Exception as error:

        print(f"PPT Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate PPT.",
            "artifacts": []
        }