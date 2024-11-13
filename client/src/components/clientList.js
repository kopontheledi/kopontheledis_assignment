// ContactList.js

import React from 'react';
import ContactSummary from './ContactSummary'; // Import the ContactSummary component

const ContactList = ({ contacts, onLinkContact }) => {
  if (contacts.length === 0) {
    return <p>No contact(s) found</p>;
  }

  return (
    <div>
      <h2>Contact Management</h2>

      {/* Display the Contact Summary */}
      <ContactSummary contacts={contacts} />

      {/* List of Contacts */}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .sort((a, b) => a.surname.localeCompare(b.surname))
            .map((contact) => (
              <tr key={contact.id}>
                <td>{contact.surname} {contact.name}</td>
                <td>{contact.email}</td>
                <td>
                  <a href={`#link-${contact.id}`} onClick={() => onLinkContact(contact.id)}>
                    Link Contact
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Button to create new contact */}
      <button onClick={() => onLinkContact(null)}>Create New Contact</button>
    </div>
  );
};

export default ContactList;
