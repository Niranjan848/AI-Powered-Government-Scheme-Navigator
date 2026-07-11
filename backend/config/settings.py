from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "Hackkkkk the Matrix"
    environment: str = "development"
    jwt_secret_key: str = "change-me"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/hackathon"
    redis_url: str = "redis://localhost:6379/0"
    gemini_model: str = "gemini-1.5-pro"


settings = Settings()
