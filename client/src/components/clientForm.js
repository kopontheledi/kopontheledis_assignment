import React, { useState } from 'react';

function ClientForm({ onCreateClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateClient(name, email);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Client</h3>
      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Client Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Client</button>
    </form>
  );
}

export default ClientForm;
