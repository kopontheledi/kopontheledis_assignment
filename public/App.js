import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
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

  const createContact = (name, surname, email, linkedClients) => {
    const newContact = { name, surname, email, linkedClients, id: Date.now() };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const removeContact = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <div>
      <h1>Client & Contact Management</h1>
      <ContactForm onCreateContact={createContact} clients={clients} />
      <ContactList contacts={contacts} onRemoveContact={removeContact} />
    </div>
  );
};

export default App;
