const sqlite3 = require('sqlite3').verbose();
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

// Function to generate client code
function generateClientCode(name) {
  const alphaPart = name.substring(0, 3).toUpperCase(); // First 3 letters in uppercase
  return `${alphaPart}${Math.floor(Math.random() * 1000)}`;
}

// Database functions
const getClients = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clients ORDER BY name ASC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createClient = (name, email) => {
  return new Promise((resolve, reject) => {
    const code = generateClientCode(name);
    db.run(
      'INSERT INTO clients (name, email, code) VALUES (?, ?, ?)',
      [name, email, code],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, email, code });
      }
    );
  });
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

// Function to remove contact
const removeContact = (contactId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM contacts WHERE id = ?', [contactId], function (err) {
      if (err) reject(err);
      else resolve({ message: 'Contact removed' });
    });
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
