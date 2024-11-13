import React from 'react';

const ContactSummary = ({ contacts }) => {
  if (contacts.length === 0) {
    return <p>No contact(s) found</p>;
  }

  return (
    <div>
      <h3>Contact Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Number of Linked Clients</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .sort((a, b) => a.surname.localeCompare(b.surname))
            .map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.surname}</td>
                <td>{contact.email}</td>
                <td style={{ textAlign: 'center' }}>
                  {contact.linkedClients.length}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactSummary;
