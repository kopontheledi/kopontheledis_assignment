const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('public'));


const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create clients table if it doesn't exist
db.run(
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    code TEXT
  );
);

// Create contacts table if it doesn't exist
db.run(
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    email TEXT,
    clientId INTEGER,
    FOREIGN KEY (clientId) REFERENCES clients(id)
  );
);

// GET clients
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST clients
app.post('/clients', (req, res) => {
  const { name, email } = req.body;
  
  // Validate name and email
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Generate a unique code (3 alphabetic characters followed by 3 digits)
  const generateCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const code = ${letters.charAt(Math.floor(Math.random() * 26))}${letters.charAt(Math.floor(Math.random() * 26))}${letters.charAt(Math.floor(Math.random() * 26))}${numbers.charAt(Math.floor(Math.random() * 10))}${numbers.charAt(Math.floor(Math.random() * 10))}${numbers.charAt(Math.floor(Math.random() * 10))};
    return code;
  };

  // Ensure code is unique
  const code = generateCode();
  db.get('SELECT * FROM clients WHERE code = ?', [code], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      return res.status(400).json({ error: 'Code must be unique' });
    }

    // Insert new client with generated code
    db.run(
      'INSERT INTO clients (name, email, code) VALUES (?, ?, ?)',
      [name, email, code],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id: this.lastID, name, email, code });
      }
    );
  });
});


// GET contacts
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST contacts
app.post('/contacts', (req, res) => {
  const { name, surname, email, clientId } = req.body;

  if (!name || !surname || !email || !clientId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO contacts (name, surname, email, clientId) VALUES (?, ?, ?, ?)',
    [name, surname, email, clientId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, surname, email, clientId });
    }
  );
});

// DELETE contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact removed' });
  });
});

// DELETE client
app.delete('/clients/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM clients WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client removed' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(Server running on http://localhost:${port});
});
