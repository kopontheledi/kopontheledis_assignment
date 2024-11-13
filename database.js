const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create tables
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

// Function to delete a contact
const removeContact = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Exported database functions
const getClients = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createClient = async (name, surname, email) => {
  try {
    const response = await fetch('http://localhost:5000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error('Failed to create client');
    }

    const newClient = await response.json();
    setClients((prevClients) => [...prevClients, newClient]);
  } catch (err) {
    console.error('Error creating client:', err.message);
  }
};


const getContacts = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM contacts ORDER BY surname, name ASC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createContact = (name, surname, email) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO contacts (name, surname, email) VALUES (?, ?, ?)',
      [name, surname, email],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, surname, email });
      }
    );
  });
};

// Export the functions
module.exports = {
  getClients,
  createClient,
  getContacts,
  createContact,
  removeContact,
};
