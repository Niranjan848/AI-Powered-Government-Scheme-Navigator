from fastapi import APIRouter

router = APIRouter()


@router.get("/profile")
async def profile() -> dict[str, object]:
    return {
        "profile_completion": 82,
        "readiness_score": 91,
        "data": {
            "name": "Demo Citizen",
            "age": 34,
            "occupation": "Farmer",
            "state": "Maharashtra",
            "annual_income": 180000,
            "land_holding_hectares": 2.5,
            "category": "General",
            "gender": "Male",
            "aadhaar_verified": True,
            "bank_account_linked": True,
        },
    }
