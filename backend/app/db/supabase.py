from supabase import create_client, Client
from app.core.config import settings

# Initialize the Supabase client
supabase_client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)