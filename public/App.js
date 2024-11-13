import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleSaveContact = async (contactData) => {
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        fetchContacts();
        setMessage('Contact saved successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (err) {
      console.error('Error creating contact:', err);
      setMessage('Error creating contact');
    }
  };

  const handleLinkContact = async (contactId, clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${contactId}/link/${clientId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error('Error linking contact:', err);
    }
  };

  const handleUnlinkClient = async (contactId, clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${contactId}/unlink/${clientId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessage('Client unlinked');
        setTimeout(() => setMessage(''), 3000);
        fetchContacts();
      }
    } catch (err) {
      console.error('Error unlinking client:', err);
    }
  };

  return (
    <div>
      <h1>Contact Management</h1>
      {message && <p>{message}</p>}
      
      <ContactForm 
        onSave={handleSaveContact}
        onCancel={() => setMessage('')}
      />
      
      <ContactList
        contacts={contacts}
        onLinkContact={handleLinkContact}
        onUnlinkClient={handleUnlinkClient}
      />
    </div>
  );
}

export default App;