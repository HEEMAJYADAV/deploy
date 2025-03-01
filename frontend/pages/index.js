import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const sendMessage = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">AI Sentiment Chatbot</h1>
      <input
        type="text"
        placeholder="Type your message..."
        className="p-2 border rounded w-80"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={sendMessage}>
        Analyze Sentiment
      </button>
      {response && (
        <div className="mt-4 p-2 bg-white rounded shadow">
          <p>Sentiment: {response.sentiment}</p>
          <p>Score: {response.score}</p>
        </div>
      )}
    </div>
  );
}
