from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel
from typing import Optional, List
from urllib.parse import urlparse 

# Import the new public client
from app.db.supabase import supabase_public_client


class WidgetConfigResponse(BaseModel):
    name: str
    greeting: Optional[str]
    placeholder: Optional[str]
    primaryColor: Optional[str]
    position: Optional[str]
    size: Optional[str]
    showAvatar: Optional[bool]
    enableTyping: Optional[bool]
    initialMessages: Optional[List[str]]

router = APIRouter()

@router.get("/widget/{bot_id}/config", response_model=WidgetConfigResponse)
def get_widget_config(bot_id: str, request: Request):
    """
    Public endpoint for the widget.js script to fetch a chatbot's configuration.
    It performs a security check against the whitelisted domain.
    This endpoint uses a separate, unauthenticated Supabase client.
    """

    origin = request.headers.get("origin")
    referer = request.headers.get("referer")

    if origin == "null" or origin is None:
        if not referer:
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Origin or Referer header is required.")
        source_url = referer
    else:
        source_url = origin

    try:
        parsed_url = urlparse(source_url)
        request_domain = parsed_url.hostname
        if request_domain and request_domain.startswith("www."):
            request_domain = request_domain[4:]
    except:
        request_domain = None
    
    # ** THE FIX IS HERE **
    # Use the dedicated public client for this query.
    response = (
        supabase_public_client.table('chatbots')
        .select("name, greeting, placeholder, primary_color, position, size, show_avatar, enable_typing, allowed_domain, initial_messages")
        .eq('id', bot_id)
        .eq('status', 'active')
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Active chatbot not found.")

    chatbot = response.data
    
    if chatbot.get("allowed_domain") and chatbot["allowed_domain"].strip() != "":
        if not request_domain or request_domain != chatbot["allowed_domain"].strip():
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This chatbot is not authorized for this domain.")
        
    config_data = {
        "name": chatbot.get("name"),
        "greeting": chatbot.get("greeting"),
        "placeholder": chatbot.get("placeholder"),
        "primaryColor": chatbot.get("primary_color"),
        "position": chatbot.get("position"),
        "size": chatbot.get("size"),
        "showAvatar": chatbot.get("show_avatar"),
        "enableTyping": chatbot.get("enable_typing"),
        "initialMessages": chatbot.get("initial_messages", [])
    }

    return WidgetConfigResponse(**config_data)