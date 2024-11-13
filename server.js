const express = require('express');
const cors = require('cors');
const { getClients, createClient, getContacts, createContact, removeContact } = require('./database'); // Make sure to include removeContact
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes for API

// Get all clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new client
app.post('/clients', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newClient = await createClient(name, email);
    res.json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new contact
app.post('/contacts', async (req, res) => {
  const { name, surname, email } = req.body;
  try {
    const newContact = await createContact(name, surname, email);
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await removeContact(id);
    res.json({ message: 'Contact removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
