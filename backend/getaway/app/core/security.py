from jose import JWTError, jwt
from core.config import settings

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