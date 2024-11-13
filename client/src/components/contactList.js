const ContactList = ({ contacts, onLinkContact }) => {
  if (contacts.length === 0) {
    return <p>No contact(s) found</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.sort((a, b) => a.surname.localeCompare(b.surname)).map(contact => (
            <tr key={contact.id}>
              <td>{contact.surname} {contact.name}</td>
              <td>{contact.email}</td>
              <td><a href={`#link-${contact.id}`} onClick={() => onLinkContact(contact.id)}>Link Contact</a></td>
            </tr>
          ))}
        </tbody>
      </table><br></br>
      <button onClick={() => onLinkContact(null)}>Create New Contact</button>
    </div>
  );
};
