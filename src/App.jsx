import { useState } from "react";
import "./App.css";
import SOSButton from "./components/SOSButton";
import ChatBot from "./components/ChatBot";
import Onboarding from "./components/Onboarding";

function App() {
  const [profile, setProfile] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const locationLink = "https://maps.google.com/?q=0,0";

  const handleCompleteOnboarding = (data) => {
    setProfile(data);
  };

  const handleActivateSos = () => {
    setSosActive(true);
  };

  const handleCopyLink = async () => {
    if (!sosActive) return;
    try {
      await navigator.clipboard.writeText(locationLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      setLinkCopied(false);
    }
  };

  if (!profile) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-accent" aria-hidden="true"></div>
        <h1 className="app-title">AI Safe Alert App</h1>
        <p className="app-subtitle">Your safety matters</p>
      </header>

      <div className="profile-card">
        <div className="profile-title">Welcome, {profile.name}</div>
        {profile.email && <div className="profile-meta">Email: {profile.email}</div>}
        <div className="profile-meta">Emergency contacts: {profile.contacts.length}</div>
      </div>

      <SOSButton isActive={sosActive} onActivate={handleActivateSos} />

      {sosActive && (
        <div className="banner success-banner">
          SOS activated. Alerts have been sent to your emergency contacts.
        </div>
      )}

      <div className="alert-card">
        <div className="alert-header">
          <div className="alert-title">Emergency Contact Alerts</div>
          <div className={`alert-pill ${sosActive ? "is-active" : ""}`}>
            {sosActive ? "Sent" : "Pending"}
          </div>
        </div>
        <div className="alert-body">
          {profile.contacts.map((contact) => (
            <div key={contact.id} className="alert-row">
              <div>
                <div className="contact-name">{contact.name}</div>
                <div className="contact-meta">{contact.phone}</div>
              </div>
              <div className={`status-pill ${sosActive ? "is-active" : ""}`}>
                {sosActive ? "Notified" : "Waiting"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`location-card ${sosActive ? "is-active" : ""}`}>
        <div className="location-title">Live Location Sharing</div>
        <div className="location-body">
          {sosActive
            ? "Active. Your location link is being shared with your emergency contacts."
            : "Inactive. Activate SOS to share your live location."}
        </div>
        <div className="location-link-row">
          <a
            className={`location-link ${sosActive ? "" : "is-disabled"}`}
            href={sosActive ? locationLink : undefined}
            target="_blank"
            rel="noreferrer"
          >
            {locationLink}
          </a>
          <button
            type="button"
            className="secondary-button"
            onClick={handleCopyLink}
            disabled={!sosActive}
          >
            {linkCopied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <ChatBot sosActive={sosActive} />
    </div>
  );
}

export default App;
