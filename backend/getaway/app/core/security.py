from datetime import datetime, timedelta, timezone
from uuid import UUID
from jose import JWTError, jwt
from app.core.config import settings

def decode_token(
    token: str
) -> dict:

    try:

        return jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[
                settings.JWT_ALGORITHM
            ]
        )

    except JWTError as e:

        raise ValueError(
            "Invalid token"
        ) from e


def create_access_token(
    user_id: UUID | str,
    email: str
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    payload = {
        "sub": str(user_id),
        "email": email,
        "type": "access",
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )