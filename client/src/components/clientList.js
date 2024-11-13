import React from 'react';

function ClientList({ clients }) {
  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.email} ({client.code})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
