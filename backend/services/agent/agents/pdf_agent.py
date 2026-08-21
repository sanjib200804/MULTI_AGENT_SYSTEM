from agent.utils.generate_pdf import generate_pdf
from config.llmModels import get_llm_model
from core.state import AgentState
import json



async def pdf_agent(state: AgentState):

    try:
        # Check PDF agent limit
        # await check_agent_limit(
        #     state["user_id"],
        #     "pdf"
        # )

        # Get PDF LLM
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

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Topic:

{state["prompt"]}
"""

        # Call LLM
        response = await llm.ainvoke(prompt)

        # Extract response content
        content = response.content

        # Parse JSON
        data = json.loads(content)

        # Deduct credits after successful LLM generation
        # await deduct_credits(
        #     state["user_id"],
        #     "pdf"
        # )

        # Generate PDF
        pdf_buffer = generate_pdf(data)

        # Generate unique filename
        filename = f"pdf-{int(time.time() * 1000)}.pdf"

        # Upload PDF to S3
        # await upload_to_s3(
        #     filename,
        #     pdf_buffer,
        #     "application/pdf"
        # )

        # Generate temporary download URL
        # download_url = await get_from_s3(
        #     filename,
        #     24 * 60
        # )

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

        print(f"PDF agent error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate PDF."
        }