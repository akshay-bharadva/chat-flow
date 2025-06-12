from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router 
from app.api.chatbots import router as chatbots_router 
from app.api.documents import router as documents_router 
from app.api.widget import router as widget_router

app = FastAPI(title="ChatFlow API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(dashboard_router, prefix="/api", tags=["Dashboard"])
app.include_router(chatbots_router, prefix="/api", tags=["Chatbots"])
app.include_router(documents_router, prefix="/api", tags=["Documents"]) 
app.include_router(widget_router, prefix="/api", tags=["Widget"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ChatFlow API"}