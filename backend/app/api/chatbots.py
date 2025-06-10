from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
from gotrue.types import User

from app.db.supabase import supabase_client
from app.models.chatbot import Chatbot, ChatbotCreate, ChatbotUpdate
from app.api.dependencies import get_current_user

router = APIRouter()
token_auth_scheme = HTTPBearer()

def check_chatbot_owner(chatbot_id: str, user_id: str):
    """Helper function to verify chatbot ownership."""
    response = supabase_client.table('chatbots').select('id').eq('id', chatbot_id).eq('user_id', user_id).execute()
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chatbot not found or you do not have permission to access it.")

@router.get("/chatbots", response_model=List[Chatbot], response_model_by_alias=False)
def get_chatbots_for_user(
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """
    Retrieves all chatbots associated with the current authenticated user.
    """
    supabase_client.postgrest.auth(token.credentials)
    response = supabase_client.table('chatbots').select('*').eq('user_id', current_user.id).order('last_updated', desc=True).execute()

    if response.data is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not fetch chatbots.")
    
    return [Chatbot.model_validate(item) for item in response.data]

@router.get("/chatbots/{chatbot_id}", response_model=Chatbot, response_model_by_alias=False)
def get_chatbot_details(
    chatbot_id: str,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """
    Retrieves the details of a specific chatbot.
    """
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    response = supabase_client.table('chatbots').select('*').eq('id', chatbot_id).single().execute()
    
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chatbot not found.")
        
    return Chatbot.model_validate(response.data)

@router.post("/chatbots", response_model=Chatbot, status_code=status.HTTP_201_CREATED, response_model_by_alias=False)
def create_chatbot(
    chatbot_data: ChatbotCreate,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """
    Creates a new chatbot for the authenticated user.
    """
    supabase_client.postgrest.auth(token.credentials)
    new_chatbot_dict = chatbot_data.model_dump()
    new_chatbot_dict["user_id"] = current_user.id
    
    response = supabase_client.table('chatbots').insert(new_chatbot_dict).execute()
    
    if not response.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create chatbot.")
    
    return Chatbot.model_validate(response.data[0])

@router.patch("/chatbots/{chatbot_id}", response_model=Chatbot, response_model_by_alias=False)
def update_chatbot_details(
    chatbot_id: str,
    chatbot_update: ChatbotUpdate,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """
    Updates the settings of a specific chatbot.
    """
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    update_data = chatbot_update.model_dump(by_alias=True, exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No update data provided.")
    
    response = supabase_client.table('chatbots').update(update_data).eq('id', chatbot_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chatbot not found or update failed.")

    return Chatbot.model_validate(response.data[0])


@router.delete("/chatbots/{chatbot_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_chatbot(
    chatbot_id: str,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """
    Deletes a specific chatbot.
    """
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    response = supabase_client.table('chatbots').delete().eq('id', chatbot_id).execute()
    
    if not response.data:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chatbot not found or delete failed.")
         
    return None