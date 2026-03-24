import { useEffect, useMemo, useState } from "react";

function ChatBot({ sosActive }) {
  const [messages, setMessages] = useState([
    {
      id: "intro",
      sender: "bot",
      text: "Assistant is standing by. Activate SOS to begin guidance.",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const getResponse = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("help") || text.includes("danger") || text.includes("emergency")) {
      return "WARNING: Stay calm. Move to a safe place and contact emergency services.";
    } else if (text.includes("hello")) {
      return "Hello. How can I assist you?";
    } else {
      return "I am here to help. Describe what you need right now.";
    }
  };

  useEffect(() => {
    if (!sosActive) return;

    setMessages((prev) => {
      const alreadyAdded = prev.some((msg) => msg.id === "sos-guidance");
      if (alreadyAdded) return prev;

      return [
        ...prev,
        {
          id: "sos-guidance",
          sender: "bot",
          text: "SOS activated. If possible, move to a safe place and contact emergency services.",
          time: new Date(),
        },
      ];
    });
  }, [sosActive]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !sosActive) return;

    const now = new Date();
    const userMessage = { id: `${now.getTime()}-user`, sender: "user", text: trimmed, time: now };
    const botMessage = {
      id: `${now.getTime()}-bot`,
      sender: "bot",
      text: getResponse(trimmed),
      time: new Date(),
    };

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
    <div className="chatbot">
      <div className="chatbot-title">AI Safety Assistant</div>

      <div className="chatbot-panel">
        {formattedMessages.map((msg) => (
          <div key={msg.id} className="chatbot-message">
            <div className="chatbot-meta">
              {msg.sender === "user" ? "You" : "AI"}{" "}
              <span className="chatbot-time">{msg.timeText}</span>
            </div>
            <div className="chatbot-text">{msg.text}</div>
          </div>
        ))}
      </div>

      {!sosActive && (
        <div className="chatbot-hint">Activate SOS to start real-time guidance.</div>
      )}

      <div className="chatbot-input-row">
        <input
          type="text"
          placeholder={sosActive ? "Type a message..." : "SOS required to chat"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!sosActive}
          className="input"
        />

        <button
          onClick={handleSend}
          className="primary-button"
          disabled={!sosActive}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
