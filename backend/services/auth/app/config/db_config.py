from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # =========================
    # Application
    # =========================

    APP_NAME: str = "Auth Service"
    DEBUG: bool = True
    PORT :int

    # =========================
    # PostgreSQL
    # =========================

    DATABASE_URL: str

    # =========================
    # Redis
    # =========================

    REDIS_URL: str = "redis://localhost:6379"

    # =========================
    # JWT
    # =========================

    JWT_SECRET_KEY: str

    JWT_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # =========================
    # Firebase
    # =========================

    FIREBASE_PROJECT_ID: str | None = None

    FIREBASE_CLIENT_EMAIL: str | None = None

    FIREBASE_PRIVATE_KEY: str | None = None

    # =========================
    # Pydantic Settings
    # =========================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()