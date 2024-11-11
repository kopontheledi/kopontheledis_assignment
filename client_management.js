// Data structures
let clients = []; // Array to store client objects
let contacts = []; // Array to store contact objects
let clientContactLinks = []; // Array to store links between clients and contacts

// Utility function to generate client code
function generateClientCode(name) {
    const alphaPart = name.substring(0, 2).toUpperCase(); // Take first two letters of name in uppercase
    let counter = 1; // Start counter for code numbering
    let code;
    do {
        code = `${alphaPart}${String(counter).padStart(3, '0')}`; // Generate code with leading zeros
        counter++;
    } while (clients.some(client => client.code === code)); // Check if code is unique
    return code;
}

// Function to add a client
function addClient(name, email) {
    const clientCode = generateClientCode(name); // Generate unique client code
    const client = {
        id: clients.length + 1, // Assign client ID based on array length
        name: name, // Client name
        email: email, // Client email
        code: clientCode // Client code
    };
    clients.push(client); // Add client to array
    console.log(`Client added: ${name} with code ${clientCode}`); // Log client addition
}

// Function to add a contact
function addContact(name, surname, email) {
    if (!contacts.some(contact => contact.email === email)) { // Check if email is unique
        const contact = {
            id: contacts.length + 1, // Assign contact ID based on array length
            name: name, // Contact name
            surname: surname, // Contact surname
            email: email, // Contact email
        };
        contacts.push(contact); // Add contact to array
        console.log(`Contact added: ${surname}, ${name}`); // Log contact addition
        return true;
    }
    console.log("Email must be unique for all contacts"); // Log duplicate email message
    return false;
}

// Function to link client and contact
function linkClientContact(clientId, contactId) {
    const link = {
        clientId: clientId, // ID of client
        contactId: contactId // ID of contact
    };
    clientContactLinks.push(link); // Add link to array
    console.log(`Linked client ${clientId} with contact ${contactId}`); // Log linking of client and contact
}

// Function to unlink client and contact
function unlinkClientContact(clientId, contactId) {
    clientContactLinks = clientContactLinks.filter(
        link => !(link.clientId === clientId && link.contactId === contactId) // Filter out specified link
    );
    console.log(`Unlinked client ${clientId} from contact ${contactId}`); // Log unlinking of client and contact
}

// Function to list all clients
function listClients() {
    if (clients.length === 0) { // Check if there are no clients
        console.log("No contact(s) found."); // Log no clients message
        return;
    }

    console.log("Client List (sorted by name):"); // Log header
    const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name)); // Sort clients by name
    sortedClients.forEach(client => {
        console.log(`${client.name}\t${client.code}\t[Unlink]`); // Log each client’s details
    });
}

// Function to list all contacts
function listContacts() {
    if (contacts.length === 0) { // Check if there are no contacts
        console.log("No contact(s) found."); // Log no contacts message
        return;
    }

    console.log("Contact List (sorted by surname, name):"); // Log header
    const sortedContacts = [...contacts].sort((a, b) => {
        const fullNameA = `${a.surname}, ${a.name}`; // Full name for contact A
        const fullNameB = `${b.surname}, ${b.name}`; // Full name for contact B
        return fullNameA.localeCompare(fullNameB); // Sort by full name
    });

    sortedContacts.forEach(contact => {
        const linkedClientsCount = clientContactLinks.filter(
            link => link.contactId === contact.id // Count links for each contact
        ).length;
        
        console.log(
            `${contact.name}\t` +
            `${contact.surname}\t` +
            `${contact.email}\t` +
            `${linkedClientsCount}` // Log number of linked clients
        );
    });
}

// Function to list contacts for a specific client
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
    }).sort((a, b) => a.fullName.localeCompare(b.fullName)); // Sort linked contacts by full name

    linkedContacts.forEach(contact => {
        console.log(`${contact.fullName}\t${contact.email}\t[Unlink]`); // Log each linked contact’s details
    });
}

// Testing Stage
console.log("Client and Contact Management System is running...");

// Test adding clients
addClient("Information Technology", "it@gmail.com"); // Add first client
addClient("Human Resources", "hr@gmail.com"); // Add second client
addClient("Human Resources", "hr@gmail.com"); // Attempt to add duplicate client

// Test adding contacts
addContact("John", "Doe", "john.doe@gmail.com"); // Add first contact
addContact("Jane", "Smith", "jane.smith@gmail.com"); // Add second contact
addContact("Jane", "Smith", "jane.smith@gmail.com"); // Attempt to add duplicate contact

// Test linking
linkClientContact(1, 1); // Link client 1 with contact 1
linkClientContact(2, 1); // Link client 2 with contact 1
linkClientContact(2, 1); // Attempt to link duplicate pair

// Test listing
console.log("\nListing all clients:");
listClients(); 

console.log("\nListing all contacts:");
listContacts(); 

console.log("\nListing contacts for client 1:");
listClientContacts(1); 

// Test unlinking
unlinkClientContact(1, 2); // Unlink client 1 from contact 2

console.log("\nListing contacts for client 1 after unlinking:");
listClientContacts(1); // List contacts linked to client 1 after unlinking
