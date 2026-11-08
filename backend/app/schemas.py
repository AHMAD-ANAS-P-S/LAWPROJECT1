from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, Dict, Any
from datetime import datetime
import re

class UserRegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Full Name of the advocate or legal user")
    email: EmailStr = Field(..., description="Valid legal/personal email address")
    mobile_number: str = Field(..., description="10-digit Indian Mobile Number")
    password: str = Field(..., min_length=6, max_length=128, description="Password min 6 characters")
    confirm_password: str = Field(..., min_length=6, max_length=128)
    package: str = Field("bilingual", description="Subscription package: english, tamil, or bilingual")
    agree_terms: bool = Field(..., description="Must agree to Terms & Conditions and Privacy Policy")

    @field_validator("mobile_number")
    @classmethod
    def validate_mobile(cls, v: str) -> str:
        # Strip spaces, dashes, parentheses and +91
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if cleaned.startswith("91") and len(cleaned) == 12:
            cleaned = cleaned[2:]
        if not re.match(r"^[6-9]\d{9}$", cleaned):
            raise ValueError("Mobile number must be a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.")
        return cleaned

    @field_validator("confirm_password")
    @classmethod
    def validate_passwords_match(cls, v: str, info) -> str:
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match.")
        return v

    @field_validator("package")
    @classmethod
    def validate_package(cls, v: str) -> str:
        val = v.lower()
        if val not in ["english", "tamil", "bilingual"]:
            raise ValueError("Language package must be 'english', 'tamil', or 'bilingual'.")
        return val

    @field_validator("agree_terms")
    @classmethod
    def validate_terms(cls, v: bool) -> bool:
        if not v:
            raise ValueError("You must agree to the Terms & Conditions and Privacy Policy.")
        return v

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: Optional[bool] = False

class GoogleLoginRequest(BaseModel):
    email: EmailStr
    full_name: str
    google_id: Optional[str] = None
    avatar_url: Optional[str] = None
    package: Optional[str] = "bilingual"

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6, max_length=128)

class UserProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    mobile_number: str
    package: str
    preferred_language: str
    is_active: bool
    created_at: datetime
    entitlements: Dict[str, Any]

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfileResponse
    message: str

class MessageResponse(BaseModel):
    status: str
    message: str
    detail: Optional[str] = None
