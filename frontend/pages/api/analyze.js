export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("https://deploy-jhp55akm2-heemajs-projects.vercel.app/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from backend" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
