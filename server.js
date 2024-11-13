const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public"

// Database Setup
const db = new sqlite3.Database('./database.db');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      email TEXT UNIQUE,
      code TEXT UNIQUE
    )
  `);
});

// Routes for API
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/clients', (req, res) => {
  const { name, email } = req.body;
  const code = generateClientCode(name);
  db.run(
    'INSERT INTO clients (name, email, code) VALUES (?, ?, ?)',
    [name, email, code],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email, code });
    }
  );
});

// Function to generate client code
function generateClientCode(name) {
  const alphaPart = name.substring(0, 3).toUpperCase();
  return `${alphaPart}${Math.floor(Math.random() * 1000)}`;
}


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


