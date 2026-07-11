from fastapi import APIRouter

router = APIRouter()


@router.get("/recommendations")
async def recommendations() -> dict[str, list[dict[str, str]]]:
    return {"items": []}


@router.get("/history")
async def history() -> dict[str, list[dict[str, str]]]:
    return {"items": []}
