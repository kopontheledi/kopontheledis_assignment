import React, { useState, useEffect } from 'react';
import ClientForm from '../client/src/components/clientForm';
import ClientList from '../client/src/components/contactList'
import ContactForm from '../client/src/components/contactForm';
import ContactList from '../client/src/components/contactList';

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

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
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

  const createContact = async (name, surname, email, clientId) => {
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, clientId }),
      });

      const newContact = await response.json();
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } catch (err) {
      console.error('Error creating contact:', err);
    }
  };

  const removeClient = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.message === 'Client removed') {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientId)
        );
      }
    } catch (err) {
      console.error('Error removing client:', err);
    }
  };

  const removeContact = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${contactId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.message === 'Contact removed') {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== contactId)
        );
      }
    } catch (err) {
      console.error('Error removing contact:', err);
    }
  };

  return (
    <div>
      <h1>Client & Contact Management</h1>
      <ClientForm onCreateClient={createClient} />
      <ClientList clients={clients} onRemoveClient={removeClient} />
      <ContactForm onCreateContact={createContact} clients={clients} />
      <ContactList contacts={contacts} onRemoveContact={removeContact} />
    </div>
  );
}

export default App;
