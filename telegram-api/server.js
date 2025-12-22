import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST API
app.post("/sendTelegram", async (req, res) => {
  const { pickup, drop, date, phone } = req.body;

  if (!pickup || !drop || !date || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const message =
    "🚕 Pondicherry Taxi Booking\n\n" +
    `Pickup: ${pickup}\n` +
    `Drop: ${drop}\n` +
    `Date: ${date}\n` +
    `Mobile: ${phone}`;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
