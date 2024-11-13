// server.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Connect to SQLite Database
const db = new sqlite3.Database(process.env.DB_PATH || './database.db', (err) => {
  if (err) console.error('Could not connect to database:', err.message);
  else console.log('Connected to SQLite database');
});

// Helper functions
const generateCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
};

const generateUniqueCode = async () => {
  let code;
  let existing;

  do {
    code = generateCode();
    existing = await new Promise((resolve, reject) => {
      db.get('SELECT 1 FROM clients WHERE code = ?', [code], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  } while (existing);

  return code;
};

// Routes
app.post('/clients', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const code = await generateUniqueCode();

  db.run(
    'INSERT INTO clients (name, email, code) VALUES (?, ?, ?)',
    [name, email, code],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Client with this name or email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, email, code });
    }
  );
});

app.post('/contacts', (req, res) => {
  const { name, surname, email } = req.body;
  const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  if (!name || !surname || !email) {
    return res.status(400).json({ error: 'Name, surname, and email are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  db.run(
    'INSERT INTO contacts (name, surname, email) VALUES (?, ?, ?)',
    [name, surname, email],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Contact with this email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, surname, email });
    }
  );
});

app.post('/client-contact-links', (req, res) => {
  const { clientId, contactId } = req.body;

  if (!clientId || !contactId) {
    return res.status(400).json({ error: 'Client and Contact IDs are required' });
  }

  db.run(
    'INSERT INTO client_contact_links (client_id, contact_id) VALUES (?, ?)',
    [clientId, contactId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Contact linked to client' });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
