from fastapi import FastAPI
from core.config import settings
from routes.auth import router as auth_router
from app.middlewares.auth_middleware import AuthMiddleware
import uvicorn

app = FastAPI()
if '__name__' == '__main__':
    uvicorn.run(
        'app.main:app',
        host = '0.0.0.0',
        port = settings.PORT,
        reload = True
    )

app.add_middleware(
    AuthMiddleware
)    
@app.get("/health")
async def health():

    return {
        "service": "gateway",
        "status": "healthy"
    }

app.include_router(auth_router)