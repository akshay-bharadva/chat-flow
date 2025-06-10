from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class Document(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    chatbot_id: str
    source_type: str
    source_name: str
    status: str
    storage_path: Optional[str] = None
    lastUpdated: str = Field(alias="last_updated")

class DocumentCreate(BaseModel):
    source_type: str
    source_name: str
    storage_path: Optional[str] = None
    content: Optional[str] = None
    chatbot_id: str
    user_id: str