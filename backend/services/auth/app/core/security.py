from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.config.db_config import settings 

def create_access_token(
    user_id: int,
    email: str
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

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


def create_refresh_token(
    user_id: int,
    email: str
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "sub": str(user_id),
        "email": email,
        "type": "refresh",
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )


def decode_token(token: str) -> dict:

    try:

        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )

        return payload

    except JWTError as e:

        raise ValueError(
            "Invalid or expired token"
        ) from e