import React, { useState } from 'react';

const ContactForm = ({ onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.surname || !formData.email) {
      setMessage('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      onSave(formData);
      setFormData({ name: '', surname: '', email: '' });
      setMessage('');
    } catch (error) {
      setMessage('Error saving contact');
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('general')}>General</button>
        <button onClick={() => setActiveTab('clients')}>Clients</button>
      </div>

      {activeTab === 'general' && (
        <form onSubmit={handleSubmit}>
          <h3>General Information</h3>
          {message && <p style={{ color: 'red' }}>{message}</p>}
          
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <button type="submit">Save Contact</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;