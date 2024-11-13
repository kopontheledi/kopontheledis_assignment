const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS client_contact_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      client_id INTEGER,
      FOREIGN KEY (contact_id) REFERENCES contacts(id),
      FOREIGN KEY (client_id) REFERENCES clients(id)
    )
  `);
});

// GET contacts with linked clients count
app.get('/contacts', (req, res) => {
  const query = `
    SELECT 
      c.*,
      COUNT(ccl.client_id) as linked_clients_count
    FROM contacts c
    LEFT JOIN client_contact_links ccl ON c.id = ccl.contact_id
    GROUP BY c.id
    ORDER BY c.surname, c.name
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST new contact
app.post('/contacts', (req, res) => {
  const { name, surname, email } = req.body;
  
  if (!name || !surname || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check email uniqueness
  db.get('SELECT id FROM contacts WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'Email address must be unique' });
    }

    // Insert new contact
    db.run(
      'INSERT INTO contacts (name, surname, email) VALUES (?, ?, ?)',
      [name, surname, email],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          id: this.lastID,
          name,
          surname,
          email,
          linked_clients_count: 0
        });
      }
    );
  });
});

// POST link client to contact
app.post('/contacts/:contactId/link/:clientId', (req, res) => {
  const { contactId, clientId } = req.params;
  
  db.run(
    'INSERT INTO client_contact_links (contact_id, client_id) VALUES (?, ?)',
    [contactId, clientId],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Client linked successfully' });
    }
  );
});

// DELETE unlink client from contact
app.delete('/contacts/:contactId/unlink/:clientId', (req, res) => {
  const { contactId, clientId } = req.params;
  
  db.run(
    'DELETE FROM client_contact_links WHERE contact_id = ? AND client_id = ?',
    [contactId, clientId],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Client unlinked' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});