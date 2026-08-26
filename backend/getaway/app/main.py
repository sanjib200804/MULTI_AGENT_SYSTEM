from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router
from app.routes.agent import router as agent_router
from app.middlewares.auth_middleware import AuthMiddleware

import uvicorn


app = FastAPI()


# -----------------------------
# Authentication middleware (Inner layer)
# -----------------------------

app.add_middleware(AuthMiddleware)


# -----------------------------
# CORS middleware (Outer layer - wraps around AuthMiddleware)
# -----------------------------

raw_origins = getattr(settings, "CORS_ORIGINS", "")
if not raw_origins or raw_origins.strip() == "*" or raw_origins.strip().lower() == "all":
    cors_kwargs = {"allow_origin_regex": r".*"}
else:
    parsed_origins = [o.strip().rstrip("/") for o in raw_origins.split(",") if o.strip()]
    cors_kwargs = {
        "allow_origins": parsed_origins,
        "allow_origin_regex": r"https://.*\.onrender\.com"
    }

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    **cors_kwargs
)


# -----------------------------
# Health
# -----------------------------

@app.get("/health")
async def health():
    return {
        "service": "gateway",
        "status": "healthy"
    }


# -----------------------------
# Routes
# -----------------------------

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(agent_router)


# -----------------------------
# Local development
# -----------------------------

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=True,
    )