from pydantic_settings import BaseSettings , SettingsConfigDict


class Settings(BaseSettings):
       model_config = SettingsConfigDict(env_file=('.env', '.env.example'), extra='ignore')

       GROQ_API_KEY :str
       MISTRAL_API_KEY :str
       CHAT_SERVICE :str
       REDIS_URL :str = "redis://localhost:6379"
       AUTH_SERVICE :str
       TAVILY_API_KEY:str
       OPENROUTER_API_KEY:str

       AWS_REGION:str
       AWS_ACCESS_KEY_ID:str
       AWS_SECRET_KEY:str
       AWS_BUCKET_NAME:str

       QDRANT_API_KEY:str
       QDRANT_URL:str


settings = Settings()
