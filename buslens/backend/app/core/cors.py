from fastapi import fastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

def add_cors(app: fastAPI) -> None:
    app.middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET","POST","OPTIONS"],
        allow_headers=["*"],
    )