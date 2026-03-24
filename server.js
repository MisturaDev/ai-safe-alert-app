import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 8787;
const openAiApiKey = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.post("/api/safety-chat", async (req, res) => {
  if (!openAiApiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
  }

  const incomingMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  if (!incomingMessages.length) {
    return res.status(400).json({ error: "messages array is required." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: incomingMessages
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "OpenAI request failed."
      });
    }

    return res.json({
      content:
        data?.choices?.[0]?.message?.content?.trim() ||
        "I could not generate a response right now."
    });
  } catch (error) {
    console.error("Safety chat request failed:", error);
    return res.status(500).json({
      error: "Failed to connect to OpenAI."
    });
  }
});

app.listen(port, () => {
  console.log(`Safety chat server listening on port ${port}`);
});
