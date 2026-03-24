function SOSButton({ isActive, onActivate }) {
  const handleClick = () => {
    if (!isActive) {
      onActivate();
    }
  };

  return (
    <div className="sos-wrap">
      <button
        onClick={handleClick}
        className={`sos-button ${isActive ? "is-active" : ""}`}
        disabled={isActive}
      >
        {isActive ? "SOS Active" : "Send SOS"}
      </button>
      <div className="sos-helper">
        {isActive
          ? "Alerts are active and contacts have been notified."
          : "Tap once to alert your emergency contacts."}
      </div>
    </div>
  );
}

export default SOSButton;
