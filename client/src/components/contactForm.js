// ContactForm.js
import React, { useState } from 'react';

function ContactForm({ onCreateContact }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateContact(name, surname, email);
    setName('');
    setSurname('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Contact</h3>
      <input 
        type="text" 
        placeholder="Name" 
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
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
