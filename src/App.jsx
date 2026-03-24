import SOSButton from "./components/SOSButton";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Safe Alert App</h1>
      <p>Your safety matters</p>

      <SOSButton />
      <ChatBot />
    </div>
  );
}

export default App;