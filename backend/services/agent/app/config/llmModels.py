from dotenv import load_dotenv
load_dotenv()

from langchain_groq import ChatGroq
from langchain_mistralai import ChatMistralAI
from langchain_google_genai import ChatGoogleGenerativeAI

groq= ChatGroq(
    model="openai/gpt-oss-120b"
)

gemini = ChatGoogleGenerativeAI(
    model ="gemini-3.6-flash"
)

mistral = ChatMistralAI(
    model='mistral-small-2506'

)

async def get_llm_model(agent : str):
    if 'chat' in agent:
        return mistral
    elif 'search' in agent:
        return groq
    elif 'coding' in agent:
        return gemini
    else:
        return groq


