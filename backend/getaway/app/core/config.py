from pydantic_settings import BaseSettings ,SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env',extra='ignore')

    AUTH_SERVICE_URL : str
    CHAT_SERVICE_URL : str
    AGENT_SERVICE_URL : str
    PORT : int
    JWT_ALGORITHM :str
    JWT_SECRET_KEY :str
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:5174"
    COOKIE_SECURE: bool = False

settings = Settings()


