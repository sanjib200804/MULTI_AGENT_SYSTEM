import json
import uuid

from core.state import AgentState
from config.llmModels import get_llm_model

from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits
from utils.generate_ppt import generate_ppt
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


def extract_json_string(text: str) -> str:
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]
    return text


async def ppt_agent(state: AgentState):

    try:
        await check_agent_limit(
            state["user_id"],
            "ppt"
        )

        llm = await get_llm_model("ppt")

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

        response = await llm.ainvoke(prompt)
        raw_content = response.content if isinstance(response.content, str) else str(response.content)
        json_str = extract_json_string(raw_content)

        data = json.loads(json_str)

        if not data.get("title"):
            data["title"] = state.get("prompt", "Presentation")

        if not data.get("slides"):
            raise ValueError("PPT slides are missing")

        ppt_buffer = await generate_ppt(data)

        filename = f"ppt-{uuid.uuid4()}.pptx"

        content_type = (
            "application/vnd.openxmlformats-officedocument."
            "presentationml.presentation"
        )

        await upload_to_s3(
            filename=filename,
            data=ppt_buffer,
            content_type=content_type
        )

        download_url = await get_from_s3(
            filename,
            24 * 60 * 60
        )

        await deduct_credits(
            state["user_id"],
            "ppt"
        )

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