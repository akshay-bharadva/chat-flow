# ChatFlow Backend

This directory contains the FastAPI backend for the ChatFlow application.

## Setup

1.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Environment Variables:**
    *   Rename the `.env.example` file to `.env`.
    *   Open the `.env` file and add your Supabase URL and Key. You can get these from your Supabase project dashboard under `Project Settings > API`.

    ```env
    SUPABASE_URL="YOUR_SUPABASE_URL"
    SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

## Running the Server

1.  **Start the development server:**
    ```bash
    uvicorn app.main:app --reload
    ```
2.  The API will be running at `http://localhost:8000`.
3.  You can access the interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.