from fastapi import FastAPI
import uvicorn
from app.routes.auth_routes import route
from app.database.database import Base, engine
from app.config.db_config import settings


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Auth Service",
    description="Authentication microservice for Multi-Agent AI System",
    version="1.0.0"
)
if __name__ == '__main__':
    uvicorn.run(
        'app.main:app',
        host = '0.0.0.0',
        port = 8001,
        reload = True
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