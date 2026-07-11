from fastapi import APIRouter

router = APIRouter()


@router.get("/notifications")
async def notifications() -> dict[str, list[dict[str, str]]]:
    return {"items": []}
