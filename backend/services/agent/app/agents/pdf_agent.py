import json
import time

from utils.generate_pdf import generate_pdf
from config.llmModels import get_llm_model
from core.state import AgentState
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


def extract_json_string(text: str) -> str:
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]
    return text


async def pdf_agent(state: AgentState):

    try:
        await check_agent_limit(
            state["user_id"],
            "pdf"
        )

        llm = await get_llm_model("pdf")

        prompt = f"""
You are an expert document writer.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Structure:

{{
    "title": "",
    "subtitle": "",
    "sections": [
        {{
            "heading": "",
            "points": []
        }}
    ]
}}

Rules:

- Generate 4-8 sections.
- Each section should have 3-6 concise bullet points.
- Return ONLY valid JSON.

Topic:

{state["prompt"]}
"""

        response = await llm.ainvoke(prompt)
        raw_content = response.content if isinstance(response.content, str) else str(response.content)
        json_str = extract_json_string(raw_content)

        data = json.loads(json_str)

        if not data.get("title"):
            data["title"] = state.get("prompt", "Document")

        pdf_buffer = generate_pdf(data)

        if hasattr(pdf_buffer, "getvalue"):
            pdf_bytes = pdf_buffer.getvalue()
        else:
            pdf_bytes = pdf_buffer

        filename = f"pdf-{int(time.time() * 1000)}.pdf"

        await upload_to_s3(
            filename,
            pdf_bytes,
            "application/pdf"
        )

        download_url = await get_from_s3(
            filename,
            600
        )

        await deduct_credits(
            state["user_id"],
            "pdf"
        )

        return {
            **state,
            "ai_response": f"""# PDF Generated

**{data["title"]}**

📥 [Download PDF]({download_url})

_Link expires in 10 minutes._
"""
        }

    except json.JSONDecodeError as error:

        print(f"PDF JSON parsing error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate valid PDF data."
        }

    except Exception as error:

        print(f"PDF Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate PDF."
        }