import uuid

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


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


async def coding_agent(state: AgentState):

    try:
        await check_agent_limit(
            state["user_id"],
            "coding"
        )

        intent_llm = await get_llm_model("intent")
        llm = await get_llm_model("coding")

        intent_response = await intent_llm.ainvoke(
            f"""
You are a coding intent classifier.

Classify the user's request into EXACTLY ONE of these categories:

CODE_GENERATION
CODE_REVIEW
DEBUGGING

Return ONLY the category name.

User Request:
{state["prompt"]}
"""
        )

        raw_intent = extract_text(intent_response.content).strip()

        if "CODE_REVIEW" in raw_intent.upper():
            intent = "CODE_REVIEW"
        elif "DEBUGGING" in raw_intent.upper():
            intent = "DEBUGGING"
        else:
            intent = "CODE_GENERATION"

        if intent == "CODE_GENERATION":

            response = await llm.ainvoke(
                f"""
You are an expert software engineer.

Generate clean, correct and production-quality code for the user's request.

Requirements:
- Understand the user's requirements carefully.
- Write only the necessary code.
- Follow the programming language/framework requested by the user.
- If no language is specified, choose Python or appropriate modern language.
- Use clean and readable code.
- Follow standard coding practices.
- Include proper code fences ```python ... ``` for all code.

Return:
1. A short explanation of the approach.
2. The complete code in code fences.
3. Usage example or execution instructions.

User Request:
{state["prompt"]}
"""
            )

        elif intent == "CODE_REVIEW":

            response = await llm.ainvoke(
                f"""
You are an expert code reviewer.

Review the user's code carefully.

Return Markdown using this structure:

# Code Review

## Problems
List the problems found.

## Improvements
Explain how the code can be improved.

## Corrected Code
Provide corrected code in code fences.

User Request:
{state["prompt"]}
"""
            )

        else:

            response = await llm.ainvoke(
                f"""
You are an expert debugging engineer.

Debug the user's code or error.

Return Markdown using this structure:

# Debugging

## Root Cause
Explain the actual cause.

## Corrected Code
Provide the corrected code in code fences.

User Request:
{state["prompt"]}
"""
            )

        await deduct_credits(
            state["user_id"],
            "coding"
        )

        ai_text = extract_text(response.content)

        return {
            **state,
            "ai_response": ai_text,
            "artifacts": []
        }

    except Exception as error:

        print(f"Coding Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to process coding request.",
            "artifacts": []
        }