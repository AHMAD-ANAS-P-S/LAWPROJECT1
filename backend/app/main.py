from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routes import auth_routes, subscription_routes, bookmark_routes, help_routes

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Tamil Law Library Secure Backend API"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows local Next.js on 3000 or any port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(subscription_routes.router)
app.include_router(bookmark_routes.router)
app.include_router(help_routes.router)

@app.get("/")
def root():
    return {
        "service": "TAMIL LAW LIBRARY API",
        "status": "online",
        "version": settings.PROJECT_VERSION,
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health():
    return {"status": "healthy"}
