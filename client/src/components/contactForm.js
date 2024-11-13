import React, { useState } from 'react';

function ContactForm({ onCreateContact, clients }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateContact(name, surname, email, clientId);
    setName('');
    setSurname('');
    setEmail('');
    setClientId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contact</h3>
      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select onChange={(e) => setClientId(e.target.value)} value={clientId}>
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
