from pydantic import BaseModel, EmailStr
from typing import Optional

# --- Request Models ---

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- Response Models ---

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str = "user"
    plan: str = "free"

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserResponse