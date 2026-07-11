from fastapi import APIRouter

router = APIRouter()


@router.get("/profile")
async def profile() -> dict[str, object]:
    return {"profile_completion": 0, "readiness_score": 0, "data": {}}
