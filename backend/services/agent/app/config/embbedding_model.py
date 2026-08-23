from langchain_mistralai import MistralAIEmbeddings
from core.settings import settings
import os
from dotenv import load_dotenv
load_dotenv()

MISTRAL_API_KEY = settings.MISTRAL_API_KEY
async def embedding_model():
    return MistralAIEmbeddings(
    model="mistral-embed",
    mistral_api_key=MISTRAL_API_KEY
)