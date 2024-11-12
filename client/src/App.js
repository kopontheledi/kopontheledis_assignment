// App.js
import React, { useState, useEffect } from 'react';
import ClientList from './components/clientList';
import ContactList from './components/ContactList';
import ClientForm from './components/ClientForm';
import ContactForm from './components/ContactForm';

function App() {
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
    fetchContacts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const clients = await response.json();
      setClients(clients);
    } catch (err) {
      setError('Error fetching clients');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contacts');
      const contacts = await response.json();
      setContacts(contacts);
    } catch (err) {
      setError('Error fetching contacts');
    }
  };

  const createClient = async (name, email) => {
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const newClient = await response.json();
      setClients([...clients, newClient]);
    } catch (err) {
      setError('Error creating client');
    }
  };

  const createContact = async (name, surname, email) => {
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email })
      });
      const newContact = await response.json();
      setContacts([...contacts, newContact]);
    } catch (err) {
      setError('Error creating contact');
    }
  };

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
      <ClientList clients={clients} />
      <ContactList contacts={contacts} />
      <ClientForm onCreateClient={createClient} />
      <ContactForm onCreateContact={createContact} />
    </div>
  );
}

export default App;
