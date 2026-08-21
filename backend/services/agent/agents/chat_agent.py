
from langchain_core.messages import AIMessage ,SystemMessage, HumanMessage
from utils.memory import get_Memory
from core.state import AgentState
from config.llmModels import get_llm_model

async def chat_agent(state:AgentState):
    try:
        llm = get_llm_model('chat')
        history = await get_Memory(state['conversationId'])

        search_context = ''

        if state.get('search_result'):
            search_context = earch_context = f"""
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

        messages= [
            SystemMessage(content=system_prompt)

        ]

        for msg in history :
            if msg['role'] == 'user':
                messages.append(
                    HumanMessage(
                        content=msg['content']

                    )
                )

            elif msg['role'] == 'assistant':
                messages.append(
                    AIMessage(content=msg['content'])
                )

                messages.append(
                    HumanMessage(
                        content=state['prompt']
                    )
                )
                response = await llm.invoke(messages)

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
