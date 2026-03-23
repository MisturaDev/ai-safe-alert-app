function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>AI Safe Alert App</h1>
      <p>Your safety matters. Stay alert, stay protected.</p>

      <button
        style={{
          marginTop: "30px",
          padding: "20px 40px",
          fontSize: "20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
        onClick={() => alert("🚨 Emergency Alert Sent! (Demo)")}
      >
        SOS
      </button>
    </div>
  );
}

export default App;