import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from .config import settings

logger = logging.getLogger("uvicorn.error")

# Determine engine with PostgreSQL preference and SQLite development fallback
DATABASE_URL = settings.DATABASE_URL
connect_args = {}

try:
    if DATABASE_URL.startswith("sqlite"):
        connect_args = {"check_same_thread": False}
        engine = create_engine(DATABASE_URL, connect_args=connect_args)
    else:
        # Attempt PostgreSQL connection
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        # Test connection
        with engine.connect() as conn:
            logger.info("Successfully connected to PostgreSQL database.")
except Exception as e:
    logger.warning(
        f"PostgreSQL connection to {DATABASE_URL} failed ({str(e)}). "
        "Falling back to local SQLite database (tamil_law_library.db) for development."
    )
    DATABASE_URL = "sqlite:///./tamil_law_library.db"
    connect_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
