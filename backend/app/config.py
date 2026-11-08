import os

class Settings:
    PROJECT_NAME: str = "Tamil Law Library API"
    PROJECT_VERSION: str = "1.0.0"
    
    # Database config: default PostgreSQL, fallback to SQLite for local development if Postgres is offline
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:postgres@localhost:5432/tamil_law_library"
    )
    
    # JWT Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "tamil_law_library_super_secret_jwt_key_2026_law_library_secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Allowed CORS origins
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://tamilrawlibrary.com",
        "https://www.tamilrawlibrary.com"
    ]

settings = Settings()
