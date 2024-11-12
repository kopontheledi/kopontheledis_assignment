const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

// Middleware for parsing JSON data in POST requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database and tables
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

  console.log("Database and tables initialized");
});

// Endpoint to fetch all clients
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Endpoint to create a new client
app.post('/clients', (req, res) => {
  const { name, email } = req.body;
  const code = generateClientCode(name);

  db.run('INSERT INTO clients (name, email, code) VALUES (?, ?, ?)', [name, email, code], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID, name, email, code });
  });
});

// Endpoint to fetch all contacts
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY surname, name ASC', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Endpoint to create a new contact
app.post('/contacts', (req, res) => {
  const { name, surname, email } = req.body;

  db.run('INSERT INTO contacts (name, surname, email) VALUES (?, ?, ?)', [name, surname, email], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID, name, surname, email });
  });
});

// Generate a unique client code based on the client's name
function generateClientCode(name) {
  const alphaPart = name.substring(0, 2).toUpperCase();
  const code = `${alphaPart}${Math.floor(Math.random() * 1000)}`;
  return code;
}

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is not running on http://localhost:${PORT}`);
});
