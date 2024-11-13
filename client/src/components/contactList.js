import React from 'react';
<<<<<<< HEAD
=======

const ContactList = ({ contacts, onLinkContact, onUnlinkClient }) => {
  if (contacts.length === 0) {
    return <p>No contact(s) found</p>;
  }
>>>>>>> parent of 799eabc (fixes)

function ContactList({ contacts, onRemoveContact }) {
  return (
    <div>
<<<<<<< HEAD
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} {contact.surname} - {contact.email}{' '}
            <button onClick={() => onRemoveContact(contact.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
=======
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
>>>>>>> parent of 799eabc (fixes)
