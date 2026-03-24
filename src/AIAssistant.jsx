import { useMemo, useState } from "react";

const SYSTEM_PROMPT =
  "You are an emergency safety assistant. Give calm, practical, step-by-step guidance. For immediate danger, always advise contacting local emergency services first.";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m your safety assistant. Tell me what is happening and I will suggest next safe steps."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const canSend = useMemo(
    () => Boolean(apiKey) && Boolean(input.trim()) && !isLoading,
    [apiKey, input, isLoading]
  );

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !apiKey || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...nextMessages]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "OpenAI request failed");
      }

      const data = await response.json();
      const assistantReply = data?.choices?.[0]?.message?.content?.trim();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            assistantReply ||
            "I could not generate a response right now. If you are in immediate danger, call local emergency services."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting to the AI service. If this is urgent, call local emergency services now."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      style={{
        margin: "36px auto 0",
        maxWidth: "760px",
        textAlign: "left",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px"
      }}
    >
      <h2 style={{ margin: "0 0 12px" }}>AI Safety Assistant</h2>
      {!apiKey && (
        <p style={{ marginTop: 0, color: "#a10000" }}>
          Add <code>VITE_OPENAI_API_KEY</code> to your environment to use AI chat.
        </p>
      )}
      <div
        style={{
          minHeight: "220px",
          maxHeight: "320px",
          overflowY: "auto",
          border: "1px solid #eee",
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#fafafa"
        }}
      >
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            style={{
              margin: "0 0 10px",
              lineHeight: 1.45,
              color: message.role === "assistant" ? "#111" : "#0057b8"
            }}
          >
            <strong>{message.role === "assistant" ? "Assistant:" : "You:"}</strong>{" "}
            {message.content}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Describe your situation..."
          style={{
            flex: 1,
            borderRadius: "8px",
            border: "1px solid #ccc",
            padding: "10px"
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!canSend}
          style={{
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            backgroundColor: canSend ? "#1166ee" : "#9db8ea",
            color: "white",
            cursor: canSend ? "pointer" : "not-allowed"
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </section>
  );
}

export default AIAssistant;
