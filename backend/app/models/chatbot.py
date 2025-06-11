from pydantic import BaseModel, Field, ConfigDict
from typing import Literal, Optional, Any, List

class Chatbot(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
    )

    id: str
    name: str
    status: Literal["active", "draft", "archived"]
    description: Optional[str] = None
    conversations: int
    accuracy: int
    lastUpdated: str  = Field(alias="last_updated")
    greeting: Optional[str] = None
    placeholder: Optional[str] = None
    primaryColor: Optional[str] = Field(default=None, alias="primary_color")
    position: Optional[str] = None
    size: Optional[str] = None
    showAvatar: Optional[bool] = Field(default=None, alias="show_avatar")
    enableTyping: Optional[bool] = Field(default=None, alias="enable_typing")
    responseDelay: Optional[int] = Field(default=None, alias="response_delay")
    allowedDomain: Optional[str] = Field(default=None, alias="allowed_domain")
    analytics: Optional[dict[str, Any]] = None

class ChatbotCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ChatbotUpdate(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
    )
    name: Optional[str] = None
    description: Optional[str] = None
    greeting: Optional[str] = None
    placeholder: Optional[str] = None
    primaryColor: Optional[str] = Field(default=None, alias="primary_color")
    position: Optional[str] = None
    size: Optional[str] = None
    showAvatar: Optional[bool] = Field(default=None, alias="show_avatar")
    enableTyping: Optional[bool] = Field(default=None, alias="enable_typing")
    responseDelay: Optional[int] = Field(default=None, alias="response_delay")
    allowedDomain: Optional[str] = Field(default=None, alias="allowed_domain")