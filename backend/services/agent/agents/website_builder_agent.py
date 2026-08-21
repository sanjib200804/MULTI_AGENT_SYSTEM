from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import checkAgentLimit
from utils.deduct_credits import deduct_credits


async def coding_agent(state: AgentState):

    try:
        # Check agent limit
        await checkAgentLimit(
            state.user_id,
            "coding"
        )

        # Get models
        intent_llm = await get_llm_model("intent")
        llm = await get_llm_model("coding")

        # -----------------------------
        # INTENT CLASSIFICATION
        # -----------------------------

        intent_response = await intent_llm.invoke(
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
{state.prompt}
"""
        )

        intent = intent_response.content.strip()

        # -----------------------------
        # CODE GENERATION
        # -----------------------------

        if intent == "CODE_GENERATION":

            prompt = f"""
You are CortexAI Coding Agent.

Generate the requested project.

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
- Smooth Scroll
- Hover Effects
- Beautiful spacing
- Single page unless user asks otherwise.

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
- No ``` 
- Never mention intent

User Request:
{state.prompt}
"""

            response = await llm.invoke(prompt)

            # Parse JSON
            import json

            data = json.loads(response.content)

            # Deduct credits
            await deduct_credits(
                state.user_id,
                "coding"
            )

            return {
                **state,
                "ai_response": "Code Generated Successfully.",
                "artifacts": [
                    {
                        "id": str(__import__("uuid").uuid4()),
                        "type": "Project",
                        "files": data.get("files", []),
                        "title": state.prompt
                    }
                ]
            }

        # -----------------------------
        # REVIEW / DEBUG / EXPLANATION
        # -----------------------------

        response = await llm.invoke(
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

{state.prompt}
"""
        )

        # Deduct credits
        await deduct_credits(
            state.user_id,
            "coding"
        )

        return {
            **state,
            "ai_response": response.content,
            "artifacts": []
        }

    except Exception as error:

        print(f"Coding Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate code",
            "artifacts": []
        }