from fastapi import APIRouter, File, UploadFile

router = APIRouter()


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)) -> dict[str, str]:
    return {"message": f"Queued {file.filename} for indexing"}
