from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS (important for frontend to access backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route to prevent 404 errors
@app.get("/")
def home():
    return {"message": "Backend is running!"}

# Define request model
class ChatRequest(BaseModel):
    message: str

@app.post("/analyze")
def analyze_sentiment(request: ChatRequest):
    sentiment = TextBlob(request.message).sentiment.polarity
    if sentiment > 0:
        result = "Positive"
    elif sentiment < 0:
        result = "Negative"
    else:
        result = "Neutral"
    return {"sentiment": result, "score": sentiment}
