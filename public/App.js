import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const handleSaveContact = async (contact) => {
    const response = await fetch('/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    const savedContact = await response.json();
    setContacts([...contacts, savedContact]);
  };

  const handleLinkClient = (contactId) => {
    alert(`Linking client to contact ${contactId}`);
  };

  return (
    <div>
      <h1>Client Contact Management</h1>
      <nav>
        <Link to="/contact-form">Contact Form</Link> |{" "}
        <Link to="/contact-summary">Contact Summary</Link>
      </nav>
      <ContactForm onSave={handleSaveContact} />
      <ContactList contacts={contacts} onLinkClient={handleLinkClient} />
    </div>
  );
};

export default App;
