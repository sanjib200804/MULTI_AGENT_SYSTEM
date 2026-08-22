import json
import uuid

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


async def website_builder(state: AgentState):

    try:
        # -----------------------------
        # CHECK AGENT LIMIT
        # -----------------------------

        await check_agent_limit(
            state["user_id"],
            "website"
        )

        # -----------------------------
        # GET MODELS
        # -----------------------------

        intent_llm = await get_llm_model("intent")
        llm = await get_llm_model("website")

        # -----------------------------
        # INTENT CLASSIFICATION
        # -----------------------------

        intent_response = await intent_llm.ainvoke(
            f"""
You are an intent classifier.

Return ONLY one of these values:

CODE_GENERATION
CODE_REVIEW
CODE_EXPLANATION
DEBUGGING
OPTIMIZATION
CONVERSION
DOCUMENTATION

User Request:
{state["prompt"]}
"""
        )

        intent = intent_response.content.strip()

        # -----------------------------
        # CODE GENERATION
        # -----------------------------

        if intent == "CODE_GENERATION":

            prompt = f"""
You are CortexAI Website Builder.

Generate the requested website.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Responsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth scrolling
- Hover effects
- Beautiful spacing
- Clean semantic HTML
- Single page unless user asks otherwise

IMAGES
=========================

Always use real Unsplash images.

Never use placeholders.

Return ONLY valid JSON.

Schema:

{{
    "files": [
        {{
            "name": "index.html",
            "content": "..."
        }},
        {{
            "name": "style.css",
            "content": "..."
        }},
        {{
            "name": "script.js",
            "content": "..."
        }}
    ]
}}

Rules:

- Output must start with {{
- Output must end with }}
- No markdown
- No explanation
- No extra text
- No code fences
- Never mention intent

User Request:
{state["prompt"]}
"""

            response = await llm.ainvoke(prompt)

            data = json.loads(response.content)

            await deduct_credits(
                state["user_id"],
                "website"
            )

            return {
                **state,
                "ai_response": "Website Generated Successfully.",
                "artifacts": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "Website",
                        "files": data.get("files", []),
                        "title": state.prompt
                    }
                ]
            }

        # -----------------------------
        # REVIEW / DEBUG / EXPLANATION
        # -----------------------------

        response = await llm.ainvoke(
            f"""
The user's request is:

{intent}

Return Markdown only.

Never generate project files.

Use headings like:

# Overview

## Explanation

## Problems

## Improvements

## Best Practices

## Optimized Code (if needed)

User Request:

{state["prompt"]}
"""
        )

        await deduct_credits(
            state["user_id"],
            "website"
        )

        return {
            **state,
            "ai_response": response.content,
            "artifacts": []
        }

    except Exception as error:

        print(f"Website Builder Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate website",
            "artifacts": []
        }