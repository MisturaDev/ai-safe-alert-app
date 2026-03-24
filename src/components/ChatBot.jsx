import { useMemo, useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello. I am the safety assistant. Briefly describe what you need help with.",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const getResponse = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("help") || text.includes("danger")) {
      return "WARNING: Stay calm. Move to a safe place and contact emergency services.";
    } else if (text.includes("hello")) {
      return "Hello. How can I assist you?";
    } else {
      return "I'm here to help. Please describe your situation.";
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const now = new Date();
    const userMessage = { sender: "user", text: trimmed, time: now };
    const botMessage = { sender: "bot", text: getResponse(trimmed), time: new Date() };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const formattedMessages = useMemo(
    () =>
      messages.map((msg) => ({
        ...msg,
        timeText: msg.time
          ? msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "",
      })),
    [messages]
  );

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>AI Safety Assistant</h3>

      <div
        style={{
          minHeight: "180px",
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "6px",
          textAlign: "left",
          background: "#fafafa",
        }}
      >
        {formattedMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "600" }}>
              {msg.sender === "user" ? "You" : "AI"}{" "}
              <span style={{ color: "#666", fontWeight: "400", fontSize: "12px" }}>
                {msg.timeText}
              </span>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: "10px", flex: 1 }}
        />

        <button onClick={handleSend} style={{ padding: "10px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
