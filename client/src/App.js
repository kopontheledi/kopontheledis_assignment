import React, { useState, useEffect } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const data = await response.json();
      setClients(data);
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

  return (
    <div>
      <h1>Client Management</h1>
      <ClientForm onCreateClient={createClient} />
      <ClientList clients={clients} />
    </div>
  );
}

export default App;
