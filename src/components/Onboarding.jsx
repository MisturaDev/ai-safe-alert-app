import { useState } from "react";

function Onboarding({ onComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  const handleAddContact = () => {
    const trimmedName = contactName.trim();
    const trimmedPhone = contactPhone.trim();

    if (!trimmedName) {
      setError("Enter a contact name.");
      return;
    }

    if (!trimmedPhone) {
      setError("Enter a phone number.");
      return;
    }

    setContacts((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${trimmedPhone}`,
        name: trimmedName,
        phone: trimmedPhone,
      },
    ]);
    setContactName("");
    setContactPhone("");
    setError("");
  };

  const handleRemoveContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (trimmedEmail && !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (contacts.length === 0) {
      setError("Add at least one emergency contact.");
      return;
    }

    setError("");
    onComplete({ name: trimmedName, email: trimmedEmail, contacts });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-accent" aria-hidden="true"></div>
        <h1 className="app-title">AI Safe Alert App</h1>
        <p className="app-subtitle">Complete setup to activate emergency support.</p>
      </header>

      <form className="card" onSubmit={handleSubmit}>
        <div className="section-title">Your Details</div>
        <input
          className="input"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="email"
          placeholder="Email address (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="section-title">Emergency Contacts</div>
        <div className="input-row">
          <input
            className="input"
            type="text"
            placeholder="Contact name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Phone number"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <button type="button" className="secondary-button" onClick={handleAddContact}>
            Add
          </button>
        </div>

        {contacts.length > 0 && (
          <div className="contact-list">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-row">
                <div>
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-meta">{contact.phone}</div>
                </div>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => handleRemoveContact(contact.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="primary-button">
          Finish Setup
        </button>
      </form>
    </div>
  );
}

export default Onboarding;

