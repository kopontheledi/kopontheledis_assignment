import React from 'react';

function ContactList({ contacts }) {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <p>{contact.name} {contact.surname} - {contact.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
