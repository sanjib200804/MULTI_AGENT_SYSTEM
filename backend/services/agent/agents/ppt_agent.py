import json
import uuid

from core.state import AgentState
from config.llmModels import get_llm_model

from utils.agent_limit import checkAgentLimit
from utils.deduct_credits import deduct_credits
from utils.generate_ppt import generate_ppt
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


async def ppt_agent(state: AgentState):

    try:
        # -----------------------------
        # CHECK AGENT LIMIT
        # -----------------------------

        await checkAgentLimit(
            state.user_id,
            "ppt"
        )

        # -----------------------------
        # GET PPT MODEL
        # -----------------------------

        llm = await get_llm_model("ppt")

        # -----------------------------
        # GENERATE PPT CONTENT
        # -----------------------------

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

{state.prompt}
"""

        response = await llm.invoke(prompt)

        # -----------------------------
        # PARSE JSON
        # -----------------------------

        data = json.loads(response.content)

        # -----------------------------
        # DEDUCT CREDITS
        # -----------------------------

        await deduct_credits(
            state.user_id,
            "ppt"
        )

        # -----------------------------
        # GENERATE PPTX
        # -----------------------------

        ppt = await generate_ppt(data)

        # Depending on your generate_ppt()
        # implementation, it should return
        # bytes / buffer.

        buffer = await ppt.write()

        # -----------------------------
        # FILE NAME
        # -----------------------------

        filename = f"ppt-{uuid.uuid4()}.pptx"

        # -----------------------------
        # UPLOAD TO S3
        # -----------------------------

        content_type = (
            "application/vnd.openxmlformats-officedocument."
            "presentationml.presentation"
        )

        await upload_to_s3(
            filename=filename,
            buffer=buffer,
            content_type=content_type
        )

        # -----------------------------
        # GET TEMPORARY DOWNLOAD URL
        # -----------------------------

        download_url = await get_from_s3(
            filename,
            24 * 60 * 60
        )

        # -----------------------------
        # RETURN STATE
        # -----------------------------

        return {
            **state,
            "ai_response": f"""
# ✅ Presentation Generated

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

    except Exception as error:

        print(f"PPT Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate PPT",
            "artifacts": []
        }