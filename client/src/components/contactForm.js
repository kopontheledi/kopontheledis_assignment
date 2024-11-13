import React, { useState } from 'react';
import ContactList from './clientList';

const ContactForm = ({ clients, onSave, onCancel, contacts }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [contactData, setContactData] = useState({
    name: '',
    surname: '',
    email: '',
    linkedClients: [],
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // validate and save contact data
    onSave(contactData);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabChange('general')}>General</button>
        <button onClick={() => handleTabChange('clients')}>Clients</button>
      </div>
      {activeTab === 'general' && (
        <div>
          <h3>General Information</h3>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contactData.name}
            onChange={handleInputChange}
            required
          />
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={contactData.surname}
            onChange={handleInputChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      )}

      {activeTab === 'clients' && (
        <div>
          <h3>Link Clients</h3>
          {clients.length === 0 ? (
            <p>No client(s) found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Client Code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.code}</td>
                    <td>
                      <a href={#unlink-${client.id}} onClick={() => handleUnlinkClient(client.id)}>
                        Unlink
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Save and Cancel Buttons */}
      <div>
        <button onClick={handleSave}>Save Contact</button>
        <button onClick={onCancel}>Cancel</button>
      </div>

      {/* Optional: Display Contact List */}
      <ContactList contacts={contacts} onLinkContact={onSave} />
    </div>
  );
};

export default ContactForm;