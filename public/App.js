// App.js
import React, { useState, useEffect } from 'react';

// ContactForm Component
const ContactForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch('/clients');
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contact = { name, surname, email, linkedClients: [] };
    await onSave(contact);
    setName('');
    setSurname('');
    setEmail('');
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div id="contactFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="tabs">
          <button type="button" onClick={() => switchTab('general')}>General</button>
          <button type="button" onClick={() => switchTab('clients')}>Clients</button>
        </div>

        {activeTab === 'general' && (
          <div id="generalTab" className="tab">
            <h3>General Information</h3>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {activeTab === 'clients' && (
          <div id="clientsTab" className="tab">
            <h3>Link Clients</h3>
            <table id="clientsTable">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Client Code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.code}</td>
                    <td><button type="button" onClick={() => linkClient(client.id)}>Link</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {clients.length === 0 && <p>No client(s) found</p>}
          </div>
        )}

        <button type="submit">Save Contact</button>
        <button type="button" onClick={() => { setName(''); setSurname(''); setEmail(''); }}>Cancel</button>
      </form>
    </div>
  );
};

// ContactList Component
const ContactList = ({ contacts, onLinkClient }) => {
  return (
    <div id="contactSummary">
      <h2>Contact Summary</h2>
      <div id="contactListContainer">
        {contacts.length === 0 ? (
          <p>No contact(s) found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.surname} {contact.name}</td>
                  <td>{contact.email}</td>
                  <td><button onClick={() => onLinkClient(contact.id)}>Link Client</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// App Component
const App = () => {
  const [contacts, setContacts] = useState([]);

  const handleSaveContact = async (contact) => {
    // Save to backend (mocked with a local update)
    const response = await fetch('/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    const savedContact = await response.json();
    setContacts([...contacts, savedContact]);
  };

  const handleLinkClient = (contactId) => {
    // Handle client linking logic here
    alert(`Linking client to contact ${contactId}`);
  };

  return (
    <div>
      <h1>Client Contact Management</h1>
      <ContactForm onSave={handleSaveContact} />
      <ContactList contacts={contacts} onLinkClient={handleLinkClient} />
    </div>
  );
};

export default App;
