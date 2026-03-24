import { useState } from "react";

function SOSButton() {
  const [alertSent, setAlertSent] = useState(false);

  const handleSOS = () => {
    setAlertSent(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button
        onClick={handleSOS}
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        🚨 SOS
      </button>

      {alertSent && (
        <p style={{ marginTop: "20px", color: "green" }}>
          Alert sent successfully! Help is on the way.
        </p>
      )}
    </div>
  );
}

export default SOSButton;