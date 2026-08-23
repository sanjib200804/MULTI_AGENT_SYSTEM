from core.state import AgentState
from config.tavily import search_tool
from utils.deduct_credits import deduct_credits


async def search_agent(state: AgentState):

    try:
        response = search_tool.search(
            query=state["prompt"],
            search_depth="basic",
            max_results=3,
        )

        print("Tavily Response:", response)

        if state.get("user_id"):
            await deduct_credits(state["user_id"], "search")

        return {
            **state,
            "search_results": response.get("results", []),
            "images": response.get("images", []),
        }

    except Exception as error:

        print(f"Search Agent Error: {error}")

        return {
            **state,
            "search_results": [],
            "images": [],
            "ai_response": "Failed to search"
        }