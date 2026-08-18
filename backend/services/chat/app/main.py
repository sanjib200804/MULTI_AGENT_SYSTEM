from fastapi import FastAPI

app = FastAPI(title='chat service..')



@app.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "service": "auth-service"
    }


# uvicorn app.main:app --reload --port 8002 