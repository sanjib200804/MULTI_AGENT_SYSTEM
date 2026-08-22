
from langchain_core.messages import AIMessage ,SystemMessage, HumanMessage
from utils.memory import get_Memory
from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits

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

        # System prompt
        system_prompt = f"""
You are CortexAI, an intelligent AI assistant.

{search_context}

If searchContext exists:

- Use search results to answer.
- Do not mention internal tools.

Rules:

- For simple questions, greetings, and short queries,
  respond naturally in plain text.
- For technical, educational, coding, or detailed topics,
  use clean Markdown.

Formatting:

- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
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

        return {
            **state,
            "ai_response": response.content
        }

    except Exception as error:
        print(f"Chat agent error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate chat"
        }
