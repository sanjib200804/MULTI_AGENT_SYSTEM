import uuid

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


async def coding_agent(state: AgentState):

    try:
        # -----------------------------
        # CHECK AGENT LIMIT
        # -----------------------------

        await check_agent_limit(
            state["user_id"],
            "coding"
        )

        # -----------------------------
        # GET MODELS
        # -----------------------------

        intent_llm = await get_llm_model("intent")
        llm = await get_llm_model("coding")

        # -----------------------------
        # CLASSIFY CODING INTENT
        # -----------------------------

        intent_response = await intent_llm.ainvoke(
            f"""
You are a coding intent classifier.

Classify the user's request into EXACTLY ONE
of these categories:

CODE_GENERATION
CODE_REVIEW
DEBUGGING

Return ONLY the category name.

Rules:

CODE_GENERATION:
- User wants new code
- User wants a function, class, API, algorithm,
  component, script, program, etc.
- User asks to implement something

CODE_REVIEW:
- User provides working or existing code
- User wants the code reviewed
- User wants bugs, bad practices, performance issues,
  security issues, or improvements identified
- Do NOT rewrite the entire project unless necessary

DEBUGGING:
- User has an error, exception, traceback, or
  unexpected behavior
- User wants the existing code fixed
- Identify the problem and provide the corrected code

User Request:

{state["prompt"]}
"""
        )

        intent = intent_response.content.strip()

        # -----------------------------
        # CODE GENERATION
        # -----------------------------

        if intent == "CODE_GENERATION":

            response = await llm.ainvoke(
                f"""
You are an expert software engineer.

Generate clean, correct and production-quality code
for the user's request.

Requirements:

- Understand the user's requirements carefully.
- Write only the necessary code.
- Follow the programming language/framework requested
  by the user.
- If no language is specified, choose an appropriate one.
- Use clean and readable code.
- Follow standard coding practices.
- Handle important edge cases.
- Do not create a website/project unless the user
  explicitly asks for one.
- Do not generate unnecessary files.
- Do not invent requirements.

Return:

1. A short explanation of the approach.
2. The complete code.
3. Important usage instructions if required.

User Request:

{state["prompt"]}
"""
            )

        # -----------------------------
        # CODE REVIEW
        # -----------------------------

        elif intent == "CODE_REVIEW":

            response = await llm.ainvoke(
                f"""
You are an expert code reviewer.

Review the user's code carefully.

Analyze:

- Bugs
- Logic problems
- Incorrect implementation
- Performance issues
- Security issues
- Error handling
- Code quality
- Maintainability
- Best practices

Do NOT unnecessarily rewrite the entire code.

Return Markdown using this structure:

# Code Review

## Problems

List the problems found.

## Severity

Mention whether each problem is:
- Critical
- High
- Medium
- Low

## Improvements

Explain how the code can be improved.

## Corrected Code

Provide corrected code only where necessary.

If the code is already correct, clearly say so.

User Request:

{state["prompt"]}
"""
            )

        # -----------------------------
        # DEBUGGING
        # -----------------------------

        elif intent == "DEBUGGING":

            response = await llm.ainvoke(
                f"""
You are an expert debugging engineer.

Debug the user's code or error.

Your job is to:

1. Identify the root cause.
2. Explain why the error happens.
3. Identify the exact problematic part.
4. Provide the corrected code.
5. Explain how the fix solves the problem.

If a traceback is provided, use it to locate
the actual source of the problem.

Do not change unrelated code.

Return Markdown using this structure:

# Debugging

## Error

Explain the error.

## Root Cause

Explain the actual cause.

## Fix

Explain the solution.

## Corrected Code

Provide the corrected code.

## Explanation

Explain the important changes.

User Request:

{state["prompt"]}
"""
            )

        # -----------------------------
        # UNKNOWN INTENT
        # -----------------------------

        else:

            return {
                **state,
                "ai_response": (
                    "I can help with code generation, "
                    "code review, and debugging."
                ),
                "artifacts": []
            }

        # -----------------------------
        # DEDUCT CREDITS
        # -----------------------------

        await deduct_credits(
            state["user_id"],
            "coding"
        )

        # -----------------------------
        # RETURN RESPONSE
        # -----------------------------

        return {
            **state,
            "ai_response": response.content,
            "artifacts": []
        }

    except Exception as error:

        print(f"Coding Agent Error: {error}")

        return {
            **state,
            "ai_response": "Failed to process coding request.",
            "artifacts": []
        }