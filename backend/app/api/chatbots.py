from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
from app.db.supabase import supabase_client
from app.models.chatbot import Chatbot, ChatbotCreate
from app.api.dependencies import get_current_user
from gotrue.types import User

router = APIRouter()
token_auth_scheme = HTTPBearer()

@router.get("/chatbots/{chatbot_id}", response_model=Chatbot)
def get_chatbot_details(
    chatbot_id: str,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Fetches the details of a single chatbot by its ID."""
    # Authenticate the client with the user's token
    supabase_client.postgrest.auth(token.credentials)

    response = supabase_client.table('chatbots').select('*').eq('id', chatbot_id).eq('user_id', current_user.id).single().execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chatbot not found"
        )
    return response.data

@router.post("/chatbots", response_model=Chatbot, status_code=status.HTTP_201_CREATED)
def create_new_chatbot(
    chatbot_data: ChatbotCreate,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme) # <-- Add token dependency
):
    """Creates a new chatbot for the authenticated user."""
    # THE FIX: Authenticate the Supabase client with the user's token BEFORE the query
    supabase_client.postgrest.auth(token.credentials)

    new_bot_data = chatbot_data.dict()
    new_bot_data['user_id'] = current_user.id

    # Now, this insert call is made by the authenticated user, not the 'anon' user
    response = supabase_client.table('chatbots').insert(new_bot_data).execute()

    print("###response",response)

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create chatbot."
        )

    return response.data[0]

@router.get("/chatbots", response_model=List[Chatbot])
def get_user_chatbots(
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Fetches the list of chatbots for the authenticated user from the database."""
    # Authenticate the client with the user's token
    supabase_client.postgrest.auth(token.credentials)

    print("##current_user.id",current_user.id)
    response = supabase_client.table('chatbots').select('*').eq('user_id', current_user.id).order('created_at', desc=True).execute()
    print("###response",response)
    return response.data