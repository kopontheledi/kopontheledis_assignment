import React, { useState, useEffect } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchContacts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const createClient = async (name, email) => {
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]);
    } catch (err) {
      console.error('Error creating client:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const createContact = async (name, surname, email) => {
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email }),
      });

      const newContact = await response.json();
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } catch (err) {
      console.error('Error creating contact:', err);
    }
  };

  return (
    <div>
      <h1>Client and Contact Management</h1>
      <ClientForm onCreateClient={createClient} />
      <ClientList clients={clients} />
      <ContactForm onCreateContact={createContact} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
