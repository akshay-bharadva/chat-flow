### 1. `chatbots` Table Creation

This query sets up the `chatbots` table with the correct data types, default values, and a crucial foreign key link to the `auth.users` table.

```sql
-- Create the chatbots table
CREATE TABLE public.chatbots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Links to the user who owns it. ON DELETE CASCADE automatically removes a user's chatbots if the user is deleted.
  name text NOT NULL,
  description text,
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