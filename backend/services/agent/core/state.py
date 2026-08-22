from typing import Any, Optional
from typing_extensions import TypedDict


class AgentState(TypedDict, total=False):
    prompt: str
    ai_response: str
    agent: str
    conversation_id: str
    search_results: list[Any]
    images: list[Any]
    artifacts: list[Any]
    user_id: str
    file: Any