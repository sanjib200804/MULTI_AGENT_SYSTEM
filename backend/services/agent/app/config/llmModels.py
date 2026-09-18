import os
from dotenv import load_dotenv
load_dotenv()

from langchain_groq import ChatGroq
from langchain_mistralai import ChatMistralAI
from langchain_google_genai import ChatGoogleGenerativeAI

groq = ChatGroq(
    model=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
    max_tokens=8192
)

gemini = ChatGoogleGenerativeAI(
    model=os.getenv("GEMINI_MODEL", "gemini-3.6-flash"),
    max_output_tokens=8192
)

mistral = ChatMistralAI(
    model=os.getenv("MISTRAL_MODEL", "mistral-small-latest")
)

async def get_llm_model(agent: str):
    if 'chat' in agent:
        return mistral
    elif 'search' in agent:
        return gemini
    elif 'coding' in agent or 'website' in agent:
        return groq
    else:
        return gemini
