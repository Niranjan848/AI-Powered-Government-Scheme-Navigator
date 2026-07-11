from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routes.auth import router as auth_router
from backend.api.routes.bookmarks import router as bookmarks_router
from backend.api.routes.chat import router as chat_router
from backend.api.routes.documents import router as documents_router
from backend.api.routes.notifications import router as notifications_router
from backend.api.routes.profile import router as profile_router
from backend.api.routes.recommendations import router as recommendations_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="Hackkkkk the Matrix API",
        description="Government scheme assistant API with agent-driven recommendations.",
        version="0.1.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router, prefix="/api", tags=["auth"])
    app.include_router(chat_router, prefix="/api", tags=["chat"])
    app.include_router(documents_router, prefix="/api", tags=["documents"])
    app.include_router(recommendations_router, prefix="/api", tags=["recommendations"])
    app.include_router(profile_router, prefix="/api", tags=["profile"])
    app.include_router(bookmarks_router, prefix="/api", tags=["bookmarks"])
    app.include_router(notifications_router, prefix="/api", tags=["notifications"])

    @app.get("/health")
    async def health_check() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()
