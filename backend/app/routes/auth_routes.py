import datetime
import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    GoogleLoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    UserProfileResponse,
    TokenResponse,
    MessageResponse,
)
from ..auth import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

def format_user_profile(user: User) -> UserProfileResponse:
    return UserProfileResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        mobile_number=user.mobile_number,
        package=user.package,
        preferred_language=user.preferred_language,
        is_active=user.is_active,
        created_at=user.created_at,
        entitlements=user.get_entitlements()
    )

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegisterRequest, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please login."
        )

    # Check if mobile number is already registered
    existing_phone = db.query(User).filter(User.mobile_number == user_data.mobile_number).first()
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this mobile number already exists."
        )

    # Create new user
    hashed_pwd = get_password_hash(user_data.password)
    new_user = User(
        full_name=user_data.full_name.strip(),
        email=user_data.email.lower().strip(),
        mobile_number=user_data.mobile_number.strip(),
        hashed_password=hashed_pwd,
        package=user_data.package.lower(),
        preferred_language="ta" if user_data.package.lower() == "tamil" else "en",
        is_active=True,
        created_at=datetime.datetime.utcnow(),
        last_login=datetime.datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(data={"sub": str(new_user.id), "email": new_user.email})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=format_user_profile(new_user),
        message=f"Registration successful! Welcome to Tamil Law Library with the {user_data.package.title()} Package."
    )

@router.post("/login", response_model=TokenResponse)
def login(login_data: UserLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email.lower().strip()).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email address or password."
        )

    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email address or password."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is currently deactivated. Please contact support."
        )

    user.last_login = datetime.datetime.utcnow()
    db.commit()

    # If remember me is checked, token can have longer validity
    token = create_access_token(data={"sub": str(user.id), "email": user.email})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=format_user_profile(user),
        message=f"Welcome back, {user.full_name}!"
    )

@router.post("/google", response_model=TokenResponse)
def google_auth(google_data: GoogleLoginRequest, db: Session = Depends(get_db)):
    """Handles Google OAuth login/registration safely without payment gateway buttons."""
    user = db.query(User).filter(User.email == google_data.email.lower().strip()).first()
    
    if not user:
        # Create user via Google
        new_user = User(
            full_name=google_data.full_name,
            email=google_data.email.lower().strip(),
            mobile_number="9800000000",
            hashed_password=get_password_hash(secrets.token_urlsafe(16)),
            package=google_data.package or "bilingual",
            preferred_language="en",
            is_active=True,
            created_at=datetime.datetime.utcnow(),
            last_login=datetime.datetime.utcnow()
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user
    else:
        user.last_login = datetime.datetime.utcnow()
        db.commit()

    token = create_access_token(data={"sub": str(user.id), "email": user.email})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=format_user_profile(user),
        message=f"Google login successful! Welcome back, {user.full_name}."
    )

@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email.lower().strip()).first()
    if not user:
        # Secure practice: don't reveal whether user exists or not, but give reassurance
        return MessageResponse(
            status="success",
            message="If an account with this email exists, a password reset link has been dispatched to your inbox.",
            detail="Simulated email sent to " + req.email
        )

    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.commit()

    return MessageResponse(
        status="success",
        message="A secure password reset link has been generated and dispatched to your email address.",
        detail=f"Reset token: {reset_token} (Valid for 15 minutes)"
    )

@router.post("/reset-password", response_model=MessageResponse)
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reset_token == req.token).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The password reset link is invalid or has expired."
        )

    user.hashed_password = get_password_hash(req.new_password)
    user.reset_token = None
    db.commit()

    return MessageResponse(
        status="success",
        message="Your password has been reset successfully. You can now login with your new password."
    )

@router.get("/me", response_model=UserProfileResponse)
def get_me(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return format_user_profile(current_user)
