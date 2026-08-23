from shared.redis.redis import redis_client


LIMITS = {
    "chat": 20,
    "coding": 5,
    "pdf": 5,
    "ppt": 5,
    "image": 5,
    "search": 5,
}


async def check_agent_limit(
    user_id: str,
    agent: str,
):

    max_limit = LIMITS.get(
        agent,
        LIMITS["chat"]
    )

    key = f"rate:{user_id}:{agent}"


    count = await redis_client.incr(key)


    if count == 1:
        await redis_client.expire(
            key,
            60
        )


    ttl = await redis_client.ttl(key)



    if count > max_limit:

        minutes = ttl // 60
        seconds = ttl % 60

        if minutes > 0:
            retry_after = f"{minutes}m : {seconds}s"
        else:
            retry_after = f"{seconds}s"

        raise AgentLimitError(
            agent=agent,
            limit=max_limit,
            remaining_time=ttl,
            retry_after=retry_after,
        )



    return {
        "remaining": max_limit - count,
        "limit": max_limit,
    }


class AgentLimitError(Exception):

    def __init__(
        self,
        agent: str,
        limit: int,
        remaining_time: int,
        retry_after: str,
    ):

        self.status_code = 429

        self.data = {
            "success": False,
            "agent": agent,
            "limit": limit,
            "remainingTime": remaining_time,
            "retryAfter": retry_after,
            "message": (
                f"You have reached the {agent} limit "
                f"({limit} requests/minute). "
                f"Try again in {retry_after}."
            ),
        }

        super().__init__(
            self.data["message"]
        )