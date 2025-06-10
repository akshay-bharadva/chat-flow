from pydantic import BaseModel

class DashboardStats(BaseModel):
    totalChatbots: int
    totalConversations: int
    satisfactionRate: int