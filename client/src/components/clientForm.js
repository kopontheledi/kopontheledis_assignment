// ClientForm.js
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
      <h3>Create New Client</h3>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Add Client</button>
    </form>
  );
}

export default ClientForm;
