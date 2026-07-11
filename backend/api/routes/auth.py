from fastapi import APIRouter

from backend.models.schemas import LoginRequest, SignupRequest

router = APIRouter()


@router.post("/signup")
async def signup(payload: SignupRequest) -> dict[str, str]:
    return {"message": "User registered", "email": payload.email}


@router.post("/login")
async def login(payload: LoginRequest) -> dict[str, str]:
    return {"access_token": "demo-token", "token_type": "bearer"}
