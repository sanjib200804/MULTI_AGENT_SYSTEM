import json
import time

from utils.generate_pdf import generate_pdf
from config.llmModels import get_llm_model
from core.state import AgentState
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits
from utils.upload_to_s3 import upload_to_s3
from utils.get_from_s3 import get_from_s3


async def pdf_agent(state: AgentState):

    try:

        # -----------------------------
        # CHECK AGENT LIMIT
        # -----------------------------

        await check_agent_limit(
            state["user_id"],
            "pdf"
        )

        # -----------------------------
        # GET MODEL
        # -----------------------------

        llm = await get_llm_model("pdf")

        # -----------------------------
        # PROMPT
        # -----------------------------

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

        # -----------------------------
        # CALL LLM
        # -----------------------------

        response = await llm.ainvoke(prompt)

        content = response.content.strip()

        # -----------------------------
        # PARSE JSON
        # -----------------------------

        data = json.loads(content)

        # -----------------------------
        # GENERATE PDF
        # -----------------------------

        pdf_buffer = generate_pdf(data)

        # If generate_pdf returns BytesIO
        if hasattr(pdf_buffer, "getvalue"):
            pdf_bytes = pdf_buffer.getvalue()
        else:
            pdf_bytes = pdf_buffer

        # -----------------------------
        # FILE NAME
        # -----------------------------

        filename = f"pdf-{int(time.time() * 1000)}.pdf"

        # -----------------------------
        # UPLOAD TO S3
        # -----------------------------

        await upload_to_s3(
            filename,
            pdf_bytes,
            "application/pdf"
        )

        # -----------------------------
        # PRESIGNED URL
        # -----------------------------

        download_url = await get_from_s3(
            filename,
            600
        )

        # -----------------------------
        # DEDUCT CREDITS
        # -----------------------------

        await deduct_credits(
            state["user_id"],
            "pdf"
        )

        # -----------------------------
        # RETURN
        # -----------------------------

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