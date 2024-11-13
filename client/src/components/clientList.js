import React from 'react';

function ClientList({ clients, onRemoveClient }) {
  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.email} ({client.code})
            <button onClick={() => onRemoveClient(client.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
