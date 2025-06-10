from pydantic import BaseModel, Field 
from typing import Literal

class Chatbot(BaseModel):
    id: str
    name: str
    status: Literal["active", "draft", "archived"]
    description: str
    conversations: int
    accuracy: int
    lastUpdated: str  = Field(alias="last_updated") 
    class Config:
    # This allows Pydantic to create a model instance even if an alias is used
        populate_by_name = True     

class ChatbotCreate(BaseModel):
    name: str
    description: str