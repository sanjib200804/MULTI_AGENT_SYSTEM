from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

search_tool = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)