from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router
from app.routes.agent import router as agent_router
from app.middlewares.auth_middleware import AuthMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    AuthMiddleware
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
if __name__ == '__main__':
    uvicorn.run(
        'app.main:app',
        host = '0.0.0.0',
        port = settings.PORT,
        reload = True
    )    
@app.get("/health")
async def health():

    return {
        "service": "gateway",
        "status": "healthy"
    }

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(agent_router)