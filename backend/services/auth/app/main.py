from fastapi import FastAPI
import uvicorn
from services.auth.app.routes.auth_routes import route
from services.auth.app.database.database import Base, engine
from services.auth.app.config.db_config import settings


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Auth Service",
    description="Authentication microservice for Multi-Agent AI System",
    version="1.0.0"
)


# Register authentication routes
app.include_router(route)


# Health check
@app.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "service": "auth-service"
    }


# Root
@app.get("/")
async def root():

    return {
        "message": "Auth Service is running"
    }