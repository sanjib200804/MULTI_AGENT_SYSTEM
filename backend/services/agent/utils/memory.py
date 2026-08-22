from shared.redis.redis import redis_client
from utils.get_messages import get_messages
import json
async def get_Memory(conversationId:str):
    key = f'messages-{conversationId}'

    cached = await redis_client.get(key)

    if cached:
        return json.loads(cached)

    messages = await get_messages(conversationId)
    
    if messages is None:
        messages = []

    await redis_client.set(
        key,
        json.dumps(messages),
        ex=24 * 60 * 60
    )    

    return messages


async def add_message(conversation_id:str , role:str, content:str):
    key = f'messages-{conversation_id}'

    raw_messages = await redis_client.get(key)

    messages = json.loads(raw_messages) if raw_messages else []

    messages.append({
        'role':role,
        'content':content
    })

    if len(messages) > 20:
        messages.pop(0)


    await redis_client.set(
        key,
        json.dumps(messages)
    )    


