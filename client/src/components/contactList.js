import React from 'react';

function ContactList({ contacts, onRemoveContact }) {
  return (
    <div>
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
