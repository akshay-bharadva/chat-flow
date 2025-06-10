from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
from app.db.supabase import supabase_client
from app.models.chatbot import Chatbot, ChatbotCreate
from app.models.dashboard import DashboardStats
from app.api.dependencies import get_current_user
from gotrue.types import User

router = APIRouter()
token_auth_scheme = HTTPBearer()

mock_chatbots_data = [
    Chatbot(id="bot-1", name="Customer Support Bot", description="E-commerce support chatbot", status="active", conversations=234, accuracy=89, lastUpdated="2023-05-15"),
    Chatbot(id="bot-2", name="Product FAQ Bot", description="Product information assistant", status="active", conversations=156, accuracy=92, lastUpdated="2023-05-10"),
    Chatbot(id="bot-3", name="Documentation Helper", description="Technical documentation bot", status="draft", conversations=0, accuracy=0, lastUpdated="2023-05-05"),
    Chatbot(id="bot-4", name="Archived Sales Bot", description="Old sales assistant", status="archived", conversations=87, accuracy=85, lastUpdated="2023-04-28"),
]

@router.get("/dashboard/stats", response_model=DashboardStats)
def get_dashboard_stats(current_user: User = Depends(get_current_user),token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    """
    Calculates and returns high-level stats for the dashboard.
    """
    supabase_client.postgrest.auth(token.credentials)
    response = supabase_client.table('chatbots').select('conversations', count='exact').eq('user_id', current_user.id).execute()
    print("##response",response)


    total_bots = response.count
    for bot in response.data:
        print("###bot",bot)
    total_convos = sum(bot["conversations"] for bot in response.data)
    satisfaction = 94 

    return DashboardStats(
        totalChatbots=total_bots,
        totalConversations=total_convos,
        satisfactionRate=satisfaction,
    )

@router.get("/dashboard/chatbots/{chatbot_id}", response_model=Chatbot)
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

@router.post("/dashboard/chatbots", response_model=Chatbot, status_code=status.HTTP_201_CREATED)
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

@router.get("/dashboard/chatbots", response_model=List[Chatbot])
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