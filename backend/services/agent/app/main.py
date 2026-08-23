import sys
import os

app_dir = os.path.dirname(__file__)
services_dir = os.path.abspath(os.path.join(app_dir, '..', '..'))
backend_dir = os.path.abspath(os.path.join(app_dir, '..', '..', '..'))

sys.path.append(app_dir)
sys.path.append(services_dir)
sys.path.append(backend_dir)

from fastapi import FastAPI
from app.routes.agent_route import router as agent_router

app = FastAPI(
    title="Agent Service",
    description="Multi-Agent Execution Service for Agentra AI",
    version="1.0.0"
)

app.include_router(agent_router)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "agent-service"
    }
