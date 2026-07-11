from fastapi import APIRouter

from backend.models.schemas import BookmarkRequest

router = APIRouter()


@router.post("/bookmark")
async def bookmark(payload: BookmarkRequest) -> dict[str, str]:
    return {"message": f"Saved {payload.scheme_id}"}
