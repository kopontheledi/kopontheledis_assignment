const express = require('express');
const cors = require('cors');
const path = require('path');
const { getClients, createClient, getContacts, createContact } = require('./database');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to get all clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new client
app.post('/clients', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newClient = await createClient(name, email);
    res.json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new contact
app.post('/contacts', async (req, res) => {
  const { name, surname, email } = req.body;
  try {
    const newContact = await createContact(name, surname, email);
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
