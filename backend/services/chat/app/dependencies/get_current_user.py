from fastapi import Header, HTTPException, status


async def get_current_user_id(
    x_user_id: str | None = Header(default=None)
) -> int:

    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID missing"
        )

    try:
        return int(x_user_id)

    except ValueError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID"
        )