// Correcting ClientForm Component
import React, { useState } from 'react';

function ClientForm({ onCreateClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onCreateClient(name, email);
      setName('');
      setEmail('');
    } else {
      alert('Please enter both name and email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Client</button>
    </form>
  );
}

export default ClientForm;
