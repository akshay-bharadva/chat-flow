from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.supabase import supabase_client
from app.models.dashboard import DashboardStats
from app.api.dependencies import get_current_user
from gotrue.types import User

router = APIRouter()
token_auth_scheme = HTTPBearer()

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