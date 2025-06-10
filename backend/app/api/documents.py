from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
from gotrue.types import User
import uuid

from app.db.supabase import supabase_client
from app.models.document import Document, DocumentCreate
from app.api.dependencies import get_current_user
from app.api.chatbots import check_chatbot_owner

router = APIRouter()
token_auth_scheme = HTTPBearer()
# **THE FIX IS HERE**
# Update the bucket name to match what you created in Supabase
BUCKET_NAME = "documents-storage"

@router.get("/chatbots/{chatbot_id}/documents", response_model=List[Document], response_model_by_alias=False)
def get_documents_for_chatbot(
    chatbot_id: str,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Retrieves all documents for a specific chatbot."""
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    response = supabase_client.table('documents').select('*').eq('chatbot_id', chatbot_id).order('created_at', desc=True).execute()
    return [Document.model_validate(item) for item in response.data]

@router.post("/chatbots/{chatbot_id}/documents/file", response_model=Document, status_code=status.HTTP_201_CREATED, response_model_by_alias=False)
async def upload_document_file(
    chatbot_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Uploads a file to Supabase Storage and creates a document record."""
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    file_bytes = await file.read()
    file_extension = ""
    if "." in file.filename:
        file_extension = file.filename.rsplit('.', 1)[1].lower()

    storage_path = f"{current_user.id}/{chatbot_id}/{uuid.uuid4()}.{file_extension}"
    
    try:
        supabase_client.storage.from_(BUCKET_NAME).upload(
            path=storage_path, 
            file=file_bytes,
            file_options={
                "content-type": file.content_type,
                "metadata": {
                    "owner": current_user.id
                }
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file to storage: {e}")

    doc_data = DocumentCreate(
        source_type="file",
        source_name=file.filename,
        storage_path=storage_path,
        chatbot_id=chatbot_id,
        user_id=current_user.id
    )
    
    response = supabase_client.table('documents').insert(doc_data.model_dump()).execute()
    
    if not response.data:
        supabase_client.storage.from_(BUCKET_NAME).remove([storage_path])
        raise HTTPException(status_code=500, detail="Failed to create document record in database.")
        
    return Document.model_validate(response.data[0])

@router.post("/chatbots/{chatbot_id}/documents/url", response_model=Document, status_code=status.HTTP_201_CREATED, response_model_by_alias=False)
def add_document_url(
    chatbot_id: str,
    url: str = Form(...),
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Adds a URL as a new document for a chatbot."""
    supabase_client.postgrest.auth(token.credentials)
    check_chatbot_owner(chatbot_id, current_user.id)
    
    doc_data = DocumentCreate(
        source_type="url",
        source_name=url,
        chatbot_id=chatbot_id,
        user_id=current_user.id
    )
    
    response = supabase_client.table('documents').insert(doc_data.model_dump()).execute()
    
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create document record.")
        
    return Document.model_validate(response.data[0])


@router.delete("/documents/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)
):
    """Deletes a document record and its corresponding file in storage."""
    supabase_client.postgrest.auth(token.credentials)
    
    doc_response = supabase_client.table('documents').select('id, storage_path, user_id').eq('id', document_id).single().execute()
    if not doc_response.data:
        raise HTTPException(status_code=404, detail="Document not found.")

    doc_to_delete = doc_response.data
    
    if doc_to_delete['user_id'] != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied.")

    if doc_to_delete.get("storage_path"):
        try:
            supabase_client.storage.from_(BUCKET_NAME).remove([doc_to_delete["storage_path"]])
        except Exception as e:
            print(f"Warning: could not delete file from storage: {e}")

    response = supabase_client.table('documents').delete().eq('id', document_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to delete document record.")
        
    return None