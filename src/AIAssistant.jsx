import { useState } from "react";

const SYSTEM_PROMPT =
  "You are an emergency safety assistant. Give calm, practical, step-by-step guidance. For immediate danger, always advise contacting local emergency services first.";

const createMessage = (role, content) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content
});

function AIAssistant() {
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Hi, I’m your safety assistant. Tell me what is happening and I will suggest next safe steps."
    )
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canSend = Boolean(input.trim()) && !isLoading;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages = [...messages, createMessage("user", trimmed)];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const payloadMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...nextMessages.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ];
      const response = await fetch("/api/safety-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: payloadMessages
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody?.error || "Safety chat request failed");
      }

      const data = await response.json();
      const assistantReply = data?.content?.trim();

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          assistantReply ||
            "I could not generate a response right now. If you are in immediate danger, call local emergency services."
        )
      ]);
    } catch (error) {
      console.error("AI safety assistant request failed:", error);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "I’m having trouble connecting to the AI service. If this is urgent, call local emergency services now."
        )
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
      <p style={{ marginTop: 0, color: "#5a5a5a" }}>
        Ask for safety guidance in real-time.
      </p>
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
        {messages.map((message) => (
          <p
            key={message.id}
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
