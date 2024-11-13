import React, { useState, useEffect } from 'react';
import ClientForm from './components/clientForm';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const clients = await response.json();
      setClients(clients);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const createClient = async (name, email) => {
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]);
    } catch (err) {
      console.error('Error creating client:', err);
    }
  };

  const deleteClient = async (id) => {
    try {
      await fetch(`http://localhost:5000/clients/${id}`, {
        method: 'DELETE',
      });
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  return (
    <div>
      <h1>Client List</h1>
      <ClientForm onCreateClient={createClient} />
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} ({client.email}) - Code: {client.code}
            <button onClick={() => deleteClient(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
