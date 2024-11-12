import React, { useState, useEffect } from 'react';
import ClientForm from './components/clientForm';// Assuming you have a ClientForm component

function App() {
  const [clients, setClients] = useState([]);

  // Fetch clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch all clients from the backend
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const data = await response.json();
      setClients(data); // Store the fetched clients
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  // Create a new client
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
      setClients((prevClients) => [...prevClients, newClient]); // Add new client to state
    } catch (err) {
      console.error('Error creating client:', err);
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
