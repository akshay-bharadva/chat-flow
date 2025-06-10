from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.supabase import supabase_client
from gotrue.errors import AuthApiError

# This scheme will extract the token from the "Authorization: Bearer <token>" header
token_auth_scheme = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token is missing",
        )
    try:
        user_response = supabase_client.auth.get_user(token.credentials)
        return user_response.user  # ✅ Only return the user data
    except AuthApiError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
