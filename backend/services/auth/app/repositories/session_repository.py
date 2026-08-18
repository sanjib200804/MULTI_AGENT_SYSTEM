from shared.redis.redis import redis_client



class SessionRepository:

    def __init__(self):
        self.redis_client = redis_client 

    async def save_refresh_token(
        self,
        user_id: int,
        refresh_token: str,
        expire_seconds: int
    ):

        key = f"refresh_token:{user_id}"

        await self.redis_client.set(
            key,
            refresh_token,
            ex=expire_seconds
        )

    async def get_refresh_token(
        self,
        user_id: int
    ):

        key = f"refresh_token:{user_id}"

        return await self.redis_client.get(key)

    async def delete_refresh_token(
        self,
        user_id: int
    ):

        key = f"refresh_token:{user_id}"

        await self.redis_client.delete(key)

    async def close(self):

        await self.redis_client.aclose()