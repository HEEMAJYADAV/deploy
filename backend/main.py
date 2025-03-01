from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/analyze")
async def analyze_sentiment(chat: ChatRequest):
    sentiment_score = TextBlob(chat.message).sentiment.polarity
    sentiment = "Positive" if sentiment_score > 0 else "Negative" if sentiment_score < 0 else "Neutral"
    return {"sentiment": sentiment, "score": sentiment_score}
