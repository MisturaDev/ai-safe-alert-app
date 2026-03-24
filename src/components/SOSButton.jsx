import { useState } from "react";

function SOSButton() {
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    setSent(true);
    // In a real app, trigger an SOS flow here.
    alert("SOS sent. Stay safe.");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#d32f2f",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {sent ? "SOS Sent" : "Send SOS"}
      </button>
    </div>
  );
}

export default SOSButton;
