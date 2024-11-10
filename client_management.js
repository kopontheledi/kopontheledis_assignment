/**
 * @typedef {Object} Client
 * @property {number} id - Unique identifier for the client
 * @property {string} name - Client's company/organization name
 * @property {string} email - Client's primary email address
 * @property {string} code - Unique generated code (format: AA000)
 */

/**
 * @typedef {Object} Contact
 * @property {number} id - Unique identifier for the contact
 * @property {string} name - Contact's first name
 * @property {string} surname - Contact's last name
 * @property {string} email - Contact's email address (must be unique)
 */

/**
 * @typedef {Object} ClientContactLink
 * @property {number} clientId - Reference to client.id
 * @property {number} contactId - Reference to contact.id
 */

// Data structures
/** @type {Client[]} */
let clients = [];
/** @type {Contact[]} */
let contacts = [];
/** @type {ClientContactLink[]} */
let clientContactLinks = [];

/**
 * Generates a unique client code based on the client's name.
 * Format: First two letters of the name (uppercase) + three-digit sequential number
 * Example: "Information Technology" -> "IN001"
 * 
 * @param {string} name - The client's name to generate code from
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
 * Adds a new client to the system.
 * Automatically generates a unique client code.
 * 
 * @param {string} name - Client's company/organization name
 * @param {string} email - Client's primary email address
 * @throws {Error} If name or email is empty
 */
function addClient(name, email) {
    if (!name || !email) {
        throw new Error('Name and email are required');
    }
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
 * Adds a new contact to the system.
 * Ensures email addresses are unique across all contacts.
 * 
 * @param {string} name - Contact's first name
 * @param {string} surname - Contact's last name
 * @param {string} email - Contact's email address
 * @returns {boolean} True if contact was added successfully, false if email already exists
 * @throws {Error} If any required field is empty
 */
function addContact(name, surname, email) {
    if (!name || !surname || !email) {
        throw new Error('Name, surname, and email are required');
    }
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
 * A contact can be linked to multiple clients and vice versa.
 * 
 * @param {number} clientId - The ID of the client to link
 * @param {number} contactId - The ID of the contact to link
 * @throws {Error} If client or contact doesn't exist
 */
function linkClientContact(clientId, contactId) {
    const clientExists = clients.some(client => client.id === clientId);
    const contactExists = contacts.some(contact => contact.id === contactId);
    
    if (!clientExists || !contactExists) {
        throw new Error('Client or contact not found');
    }

    const link = {
        clientId: clientId,
        contactId: contactId
    };
    clientContactLinks.push(link);
    console.log(`Linked client ${clientId} with contact ${contactId}`);
}

/**
 * Removes a link between a client and a contact.
 * 
 * @param {number} clientId - The ID of the client to unlink
 * @param {number} contactId - The ID of the contact to unlink
 */
function unlinkClientContact(clientId, contactId) {
    const originalLength = clientContactLinks.length;
    clientContactLinks = clientContactLinks.filter(
        link => !(link.clientId === clientId && link.contactId === contactId)
    );
    
    if (clientContactLinks.length === originalLength) {
        console.log('No link found to remove');
        return;
    }
    
    console.log(`Unlinked client ${clientId} from contact ${contactId}`);
}

/**
 * Lists all clients alphabetically by name.
 * Displays name, code, and an unlink option for each client.
 */
function listClients() {
    if (clients.length === 0) {
        console.log("No client(s) found.");
        return;
    }

    console.log("Client List (sorted by name):");
    const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
    sortedClients.forEach(client => {
        console.log(`${client.name}\t${client.code}\t[Unlink]`);
    });
}

/**
 * Lists all contacts sorted by surname, then name.
 * Displays full name, email, and number of linked clients for each contact.
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
 * Lists all contacts associated with a specific client.
 * Displays contacts sorted alphabetically by surname, then name.
 * 
 * @param {number} clientId - The ID of the client to list contacts for
 * @throws {Error} If client doesn't exist
 */
function listClientContacts(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        throw new Error('Client not found');
    }

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