

from core.state import AgentState
from config.tavily import search_tool


async def search_agent(state: AgentState):

    try:
        response = search_tool.search(
            query=state["prompt"],
            search_depth="basic",
            max_results=3,
        )

        print(response)

        return {
            **state,
            "search_results": response.get("results", []),
            "images": response.get("images", []),
        }

    except Exception as error:

        print(f"Search error: {error}")

        return {
            **state,
            "search_results": [],
            "images": [],
            "ai_response": "Failed to search"
        }