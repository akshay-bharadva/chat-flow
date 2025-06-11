### 1. `chatbots` Table Creation

This query sets up the `chatbots` table with the correct data types, default values, and a crucial foreign key link to the `auth.users` table.

```sql
-- Create the chatbots table
CREATE TABLE public.chatbots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Links to the user who owns it. ON DELETE CASCADE automatically removes a user's chatbots if the user is deleted.
  name text NOT NULL,
  description text,
  greeting text DEFAULT 'Hello! How can I help you today?'::text,
  placeholder text DEFAULT 'Type your message...'::text,
  primary_color text DEFAULT '#3B82F6'::text,
  position text DEFAULT 'bottom-right'::text,
  size text DEFAULT 'medium'::text,
  show_avatar boolean DEFAULT true,
  enable_typing boolean DEFAULT true,
  response_delay integer DEFAULT 500, -- in millisecond
  analytics jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft', -- e.g., 'draft', 'active', 'archived'
  conversations integer NOT NULL DEFAULT 0,
  accuracy integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_updated timestamptz NOT NULL DEFAULT now()
);

-- Add comments to columns for clarity
COMMENT ON COLUMN public.chatbots.user_id IS 'The user who owns this chatbot.';
```

---

### 2. (Recommended) Automatic `last_updated` Trigger

By default, `last_updated` only gets set on creation. To automatically update it whenever a row is changed, you should create a trigger function. This is a best practice for "last modified" timestamps.

```sql
-- Create a function that updates the last_updated column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function before any update on the chatbots table
CREATE TRIGGER on_chatbots_update
BEFORE UPDATE ON public.chatbots
FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_at();
```

---

### 3. Row Level Security (RLS) Policies

These queries first enable Row Level Security on the table and then add the specific rules to ensure users can only access their own data.

```sql
-- 1. Enable Row Level Security (RLS) on the table
ALTER TABLE public.chatbots ENABLE ROW LEVEL SECURITY;


-- 2. Create policy for SELECT: Users can only read their own chatbots.
CREATE POLICY "Allow individual read access"
ON public.chatbots
FOR SELECT
USING (auth.uid() = user_id);


-- 3. Create policy for INSERT: Users can only create chatbots for themselves.
CREATE POLICY "Allow individual insert access"
ON public.chatbots
FOR INSERT
WITH CHECK (auth.uid() = user_id);


-- 4. Create policy for UPDATE: Users can only update their own chatbots.
CREATE POLICY "Allow individual update access"
ON public.chatbots
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


-- 5. Create policy for DELETE: Users can only delete their own chatbots.
CREATE POLICY "Allow individual delete access"
ON public.chatbots
FOR DELETE
USING (auth.uid() = user_id);
```

---

### 4. `documents` Table Creation

This query sets up the `documents` table, which stores the knowledge base sources for each chatbot. It links directly to both `chatbots` and `auth.users`.

```sql
-- Create an enum type for the source of the document
CREATE TYPE public.source_type AS ENUM ('file', 'url', 'text');

-- Create the documents table
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chatbot_id uuid NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_type public.source_type NOT NULL,
  storage_path text,
  source_name text NOT NULL, -- Filename or URL
  content text, -- Extracted text content
  status text NOT NULL DEFAULT 'processing', -- e.g., 'processing', 'completed', 'failed'
  created_at timestamptz NOT NULL DEFAULT now(),
  last_updated timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on the documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Allow individual access to own documents"
ON public.documents
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create a trigger to auto-update last_updated on change
CREATE TRIGGER on_documents_update
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_at();
```

```sql
--
--  BUCKET: document-storage
--
--  These policies ensure that users can only access and manage their own files
--  within the 'document-storage' bucket.
--

CREATE POLICY "Allow individual insert access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents-storage');

-- This policy allows any authenticated user to upload files to the documents-storage bucket without enforcing the owner check. After uploading, you can manually update the owner field in the storage.objects table or rely on a trigger.

-- Function to set the owner field
CREATE OR REPLACE FUNCTION set_storage_owner()
RETURNS TRIGGER AS $$
BEGIN
  NEW.owner = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before insert
CREATE TRIGGER set_owner_trigger
BEFORE INSERT ON storage.objects
FOR EACH ROW
EXECUTE FUNCTION set_storage_owner();

--This trigger automatically sets the owner field to the authenticated user's UID before a new row is inserted into storage.objects.


-- 1. Allow Logged-in Users to VIEW/SELECT their own files.
--    This policy allows a user to list or download files where their UID
--    matches the file's owner id.
CREATE POLICY "Allow individual read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents-storage' AND auth.uid() = owner);

-- 2. Allow Logged-in Users to UPDATE their own files.
--    This includes renaming or moving a file. The user must be the owner
--    of the file they are trying to modify.
CREATE POLICY "Allow individual update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents-storage' AND auth.uid() = owner);


-- 3. Allow Logged-in Users to DELETE their own files.
--    This policy ensures a user can only delete files that they own.
CREATE POLICY "Allow individual delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents-storage' AND auth.uid() = owner);
```