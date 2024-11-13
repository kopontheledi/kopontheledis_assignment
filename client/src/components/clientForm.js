import React, { useState } from 'react';

function ClientForm({ onCreateClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onCreateClient(name, email, surname);
      setName('');
      setSurname('');
      setEmail('');
    } else {
      alert('Please enter both name, surname and email');
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
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Create Client</button>
    </form>
  );
}

export default ClientForm;
