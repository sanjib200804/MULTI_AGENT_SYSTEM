from fastapi import APIRouter, UploadFile, File, Form, Header

from app.services.agent_service import agent

router = APIRouter()


@router.post("/agent")
async def run_agent(
    prompt: str = Form(...),
    conversation_id: str = Form(...),
    agent_name: str = Form("auto"),
    user_id: str = Header(..., alias="x-user-id"),
    file: UploadFile | None = File(None)
):

    return await agent(
        user_id=user_id,
        prompt=prompt,
        conversation_id=conversation_id,
        selected_agent=agent_name,
        file=file
    )