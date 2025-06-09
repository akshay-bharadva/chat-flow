from fastapi import APIRouter, HTTPException, status
from app.db.supabase import supabase_client
from app.models.user import UserCreate, UserLogin, UserResponse, TokenResponse
from gotrue.errors import AuthApiError

router = APIRouter()

@router.post("/auth/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_credentials: UserCreate):
    """
    Creates a new user in Supabase Auth.
    """
    try:
        # Supabase sign_up requires email and password.
        # We store additional data like 'name' in the 'data' field of options.
        session = supabase_client.auth.sign_up({
            "email": user_credentials.email,
            "password": user_credentials.password,
            "options": {
                "data": {
                    "full_name": user_credentials.name
                }
            }
        })

        if session.user:
            # Construct the response based on the created user
            user_data = {
                "id": session.user.id,
                "name": session.user.user_metadata.get("full_name", ""),
                "email": session.user.email,
                # Default role and plan for new users
                "role": "user",
                "plan": "free"
            }
            return UserResponse(**user_data)
        
        # This case should ideally not be reached if sign_up is successful
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create user account."
        )

    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message,
        )

@router.post("/auth/signin", response_model=TokenResponse)
def signin(user_credentials: UserLogin):
    """
    Authenticates a user and returns a session token.
    """
    try:
        session = supabase_client.auth.sign_in_with_password({
            "email": user_credentials.email,
            "password": user_credentials.password
        })

        if session.user and session.session:
            user_data = {
                "id": session.user.id,
                "name": session.user.user_metadata.get("full_name", ""),
                "email": session.user.email,
                "role": session.user.user_metadata.get("role", "user"), # You can store roles in metadata
                "plan": session.user.user_metadata.get("plan", "free")
            }
            
            return TokenResponse(
                access_token=session.session.access_token,
                refresh_token=session.session.refresh_token,
                user=UserResponse(**user_data)
            )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=e.message or "Invalid credentials",
        )