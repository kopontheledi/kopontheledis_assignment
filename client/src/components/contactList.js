import React from 'react';

const ContactList = ({ contacts, onLinkContact, onUnlinkClient }) => {
  if (contacts.length === 0) {
    return <p>No contact(s) found</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Surname</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th style={{ textAlign: 'center' }}>No. of Linked Clients</th>
            <th style={{ textAlign: 'left' }}></th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .sort((a, b) => `${a.surname}${a.name}`.localeCompare(`${b.surname}${b.name}`))
            .map(contact => (
              <tr key={contact.id}>
                <td style={{ textAlign: 'left' }}>{contact.name}</td>
                <td style={{ textAlign: 'left' }}>{contact.surname}</td>
                <td style={{ textAlign: 'left' }}>{contact.email}</td>
                <td style={{ textAlign: 'center' }}>{contact.linkedClients?.length || 0}</td>
                <td style={{ textAlign: 'left' }}>
                  {contact.linkedClients?.length > 0 ? (
                    <a href="#" onClick={() => onUnlinkClient(contact.id)}>Unlink</a>
                  ) : (
                    <a href="#" onClick={() => onLinkContact(contact.id)}>Link Contact</a>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;