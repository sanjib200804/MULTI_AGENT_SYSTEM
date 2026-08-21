from typing import Any, Optional
from typing_extensions import TypedDict


class AgentState(TypedDict, total=False):
    prompt: str
    aiResponse: str
    agent: str
    conversationId: str
    searchResults: list[Any]
    images: list[Any]
    artifacts: list[Any]
    userId: str
    file: Any