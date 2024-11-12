const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for all requests

// Initialize SQLite database
const db = new sqlite3.Database('./database.db');

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

function generateClientCode(name) {
  const alphaPart = name.substring(0, 3).toUpperCase();
  return `${alphaPart}${Math.floor(Math.random() * 1000)}`;
}

// API Endpoints

// Fetch all clients
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Create a new client
app.post('/clients', (req, res) => {
  const { name, email } = req.body;
  const code = generateClientCode(name);

  db.run('INSERT INTO clients (name, email, code) VALUES (?, ?, ?)', [name, email, code], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID, name, email, code });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
