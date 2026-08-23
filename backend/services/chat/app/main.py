import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from fastapi import FastAPI
from app.routes.chat_router import router as chat_router
from app.database.database import Base, engine
from app.models.conversation_model import ConversationModel
from app.models.message_model import MessageModel

Base.metadata.create_all(bind=engine)

app = FastAPI(title='chat service..')

app.include_router(chat_router)

@app.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "service": "chat-service"
    }


# uvicorn app.main:app --reload --port 8002 