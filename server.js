const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

const db = new sqlite3.Database('./database.db');

app.use(express.json());

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      email TEXT UNIQUE,
      code TEXT UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      surname TEXT,
      email TEXT UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS client_contact_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      contact_id INTEGER,
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    )
  `);
});

// Route to get all clients
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Route to create a client
app.post('/clients', (req, res) => {
  const { name, email, code } = req.body;
  db.run(
    'INSERT INTO clients (name, email, code) VALUES (?, ?, ?)',
    [name, email, code],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, email, code });
    }
  );
});

// Route to get all contacts
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY surname, name ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Route to create a contact
app.post('/contacts', (req, res) => {
  const { name, surname, email } = req.body;
  db.run(
    'INSERT INTO contacts (name, surname, email) VALUES (?, ?, ?)',
    [name, surname, email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, surname, email });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
