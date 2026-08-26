import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from fastapi import FastAPI
import uvicorn
from app.routes.auth_routes import route
from app.database.database import Base, engine
from app.config.db_config import settings


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Auth Service",
    description="Authentication microservice for Multi-Agent AI System",
    version="1.0.0"
)


app.include_router(route)


@app.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "service": "auth-service"
    }


@app.get("/")
async def root():

    return {
        "message": "Auth Service is running"
    }