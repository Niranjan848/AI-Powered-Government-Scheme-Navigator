from typing import Literal

from pydantic import BaseModel, EmailStr, Field


Role = Literal["citizen", "admin"]


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    role: Role = "citizen"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    conversation_id: str | None = None


class BookmarkRequest(BaseModel):
    scheme_id: str


class ApiMessage(BaseModel):
    detail: str
