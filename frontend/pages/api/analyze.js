export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  
    const response = await fetch("https://your-fastapi-backend.vercel.app/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  