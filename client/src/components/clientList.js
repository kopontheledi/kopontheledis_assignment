import React from 'react';

function ClientList({ clients }) {
  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <p>{client.name} - {client.email} (Code: {client.code})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
