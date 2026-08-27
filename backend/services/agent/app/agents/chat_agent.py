from langchain_core.messages import AIMessage, SystemMessage, HumanMessage
from utils.memory import get_Memory
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


async def chat_agent(state: AgentState):
    try:
        await check_agent_limit(
            state["user_id"],
            "chat"
        )
        llm = await get_llm_model('chat')
        history = await get_Memory(state['conversation_id'])

        search_context = ''

        if state.get('search_results'):
            search_context = f"""
Web Search Results:

{state["search_results"]}

Answer the user using only the above search results.
"""

        system_prompt = f"""
You are CortexAI, a helpful, intelligent, and thorough AI assistant.

{search_context}

If searchContext exists:
- Use search results to build your answer.
- Do not mention internal tools.

Response Guidelines:
- Provide complete, detailed, and clear explanations. Avoid overly brief or truncated responses.
- For simple greetings, respond warmly and concisely.
- For technical, educational, coding, or detailed topics, provide comprehensive answers using clean Markdown.

Formatting:
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for key items and numbered lists for step-by-step instructions.
- Use fenced code blocks with language tags for all code snippets.
"""

        messages = [
            SystemMessage(content=system_prompt)
        ]

        current_prompt_added = False
        if history:
            for msg in history:
                role = msg.get('role')
                content = msg.get('content', '')
                if role == 'user':
                    messages.append(HumanMessage(content=content))
                elif role == 'assistant':
                    messages.append(AIMessage(content=content))

            if messages and isinstance(messages[-1], HumanMessage) and messages[-1].content == state["prompt"]:
                current_prompt_added = True

        if not current_prompt_added:
            messages.append(HumanMessage(content=state["prompt"]))

        response = await llm.ainvoke(messages)

        await deduct_credits(
            state["user_id"],
            "chat"
        )

        ai_text = extract_text(response.content)

        return {
            **state,
            "ai_response": ai_text
        }

    except Exception as error:
        print(f"Chat agent error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate chat"
        }
