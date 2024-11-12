/**
 * Client Contact Management System
 * 
 * A system for managing clients, contacts, and their relationships in a business context.
 * This module provides functionality to create, link, and manage clients and their associated
 * contacts while maintaining unique identifiers and preventing duplicate entries.
 * 
 * Features:
 * - Client management with automatic code generation
 * - Contact management with email uniqueness validation
 * - Bi-directional linking between clients and contacts
 * - Sorted listing of clients and contacts
 * - Contact count tracking per client
 */

// Data structures
let clients = []; // Array to store client objects: {id, name, email, code}
let contacts = []; // Array to store contact objects: {id, name, surname, email}
let clientContactLinks = []; // Array to store many-to-many relationships: {clientId, contactId}

/**
 * Generates a unique client code based on the client's name.
 * Format: First two letters of name (uppercase) + sequential number (3 digits)
 * Example: "Information Technology" -> "IN001"
 * 
 * @param {string} name - The client's name
 * @returns {string} A unique client code
 */
function generateClientCode(name) {
    const alphaPart = name.substring(0, 2).toUpperCase();
    let counter = 1;
    let code;
    do {
        code = `${alphaPart}${String(counter).padStart(3, '0')}`;
        counter++;
    } while (clients.some(client => client.code === code));
    return code;
}

/**
 * Adds a new client to the system with a generated unique code.
 * 
 * @param {string} name - The client's name
 * @param {string} email - The client's email address
 */
function addClient(name, email) {
    const clientCode = generateClientCode(name);
    const client = {
        id: clients.length + 1,
        name: name,
        email: email,
        code: clientCode
    };
    clients.push(client);
    console.log(`Client added: ${name} with code ${clientCode}`);
}

/**
 * Adds a new contact to the system if the email is unique.
 * 
 * @param {string} name - The contact's first name
 * @param {string} surname - The contact's last name
 * @param {string} email - The contact's email address
 * @returns {boolean} True if contact was added successfully, false if email already exists
 */
function addContact(name, surname, email) {
    if (!contacts.some(contact => contact.email === email)) {
        const contact = {
            id: contacts.length + 1,
            name: name,
            surname: surname,
            email: email,
        };
        contacts.push(contact);
        console.log(`Contact added: ${surname}, ${name}`);
        return true;
    }
    console.log("Email must be unique for all contacts");
    return false;
}

/**
 * Creates a link between a client and a contact.
 * 
 * @param {number} clientId - The ID of the client
 * @param {number} contactId - The ID of the contact
 */
function linkClientContact(clientId, contactId) {
    const link = {
        clientId: clientId,
        contactId: contactId
    };
    clientContactLinks.push(link);
    console.log(`Linked client ${clientId} with contact ${contactId}`);
}

/**
 * Removes the link between a client and a contact.
 * 
 * @param {number} clientId - The ID of the client
 * @param {number} contactId - The ID of the contact
 */
function unlinkClientContact(clientId, contactId) {
    clientContactLinks = clientContactLinks.filter(
        link => !(link.clientId === clientId && link.contactId === contactId)
    );
    console.log(`Unlinked client ${clientId} from contact ${contactId}`);
}

/**
 * Displays a sorted list of all clients.
 * Clients are sorted alphabetically by name.
 * Each client entry shows: name, code, and an [Unlink] option
 */
function listClients() {
    if (clients.length === 0) {
        console.log("No contact(s) found.");
        return;
    }

    console.log("Client List (sorted by name):");
    const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
    sortedClients.forEach(client => {
        console.log(`${client.name}\t${client.code}\t[Unlink]`);
    });
}

/**
 * Displays a sorted list of all contacts.
 * Contacts are sorted by surname, then first name.
 * Each contact entry shows: name, surname, email, and number of linked clients
 */
function listContacts() {
    if (contacts.length === 0) {
        console.log("No contact(s) found.");
        return;
    }

    console.log("Contact List (sorted by surname, name):");
    const sortedContacts = [...contacts].sort((a, b) => {
        const fullNameA = `${a.surname}, ${a.name}`;
        const fullNameB = `${b.surname}, ${b.name}`;
        return fullNameA.localeCompare(fullNameB);
    });

    sortedContacts.forEach(contact => {
        const linkedClientsCount = clientContactLinks.filter(
            link => link.contactId === contact.id
        ).length;
        
        console.log(
            `${contact.name}\t` +
            `${contact.surname}\t` +
            `${contact.email}\t` +
            `${linkedClientsCount}`
        );
    });
}

/**
 * Displays a sorted list of contacts associated with a specific client.
 * Contacts are sorted by surname, then first name.
 * Each contact entry shows: full name, email, and an [Unlink] option
 * 
 * @param {number} clientId - The ID of the client whose contacts should be listed
 */
function listClientContacts(clientId) {
    const clientLinks = clientContactLinks.filter(link => link.clientId === clientId);
    if (clientLinks.length === 0) {
        console.log("No contacts found.");
        return;
    }

    const linkedContacts = clientLinks.map(link => {
        const contact = contacts.find(c => c.id === link.contactId);
        return {
            fullName: `${contact.surname}, ${contact.name}`,
            email: contact.email
        };
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));

    linkedContacts.forEach(contact => {
        console.log(`${contact.fullName}\t${contact.email}\t[Unlink]`);
    });
}

// Testing Stage
console.log("Client and Contact Management System is running...");

// Test adding clients
addClient("Information Technology", "it@gmail.com");
addClient("Human Resources", "hr@gmail.com");
addClient("Human Resources", "hr@gmail.com");

// Test adding contacts
addContact("John", "Doe", "john.doe@gmail.com"); 
addContact("Jane", "Smith", "jane.smith@gmail.com");
addContact("Jane", "Smith", "jane.smith@gmail.com");

// Test linking
linkClientContact(1, 1);
linkClientContact(2, 1);
linkClientContact(2, 1);

// Test listing
console.log("\nListing all clients:");
listClients();

console.log("\nListing all contacts:");
listContacts();

console.log("\nListing contacts for client 1:");
listClientContacts(1);

// Test unlinking
unlinkClientContact(1, 2);

console.log("\nListing contacts for client 1 after unlinking:");
listClientContacts(1);