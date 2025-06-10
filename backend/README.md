Run the Backend Server

1.  Open your terminal in the `chatbot-backend/` directory.
2.  Run the following command:
    ```bash
    uvicorn app.main:app --reload
    ```
3.  Your API server is now running at `http://localhost:8000`.
4.  You can view the interactive API documentation (Swagger UI) by navigating to **`http://localhost:8000/docs`**. You can even test your `/api/auth/signup` and `/api/auth/signin` endpoints directly from this page.

---