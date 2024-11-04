// Data structures
let clients = [];
let contacts = [];
let clientContactLinks = [];

// Utility function to generate client code
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

// Function to add a client
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

// Function to add a contact
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

// Function to link client and contact
function linkClientContact(clientId, contactId) {
    const link = {
        clientId: clientId,
        contactId: contactId
    };
    clientContactLinks.push(link);
    console.log(`Linked client ${clientId} with contact ${contactId}`);
}

// Function to unlink client and contact
function unlinkClientContact(clientId, contactId) {
    clientContactLinks = clientContactLinks.filter(
        link => !(link.clientId === clientId && link.contactId === contactId)
    );
    console.log(`Unlinked client ${clientId} from contact ${contactId}`);
}

// Function to list all clients
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

// Function to list all contacts
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

// Test adding contacts
addContact("John", "Doe", "aobakwe.sello@gmail.com");
addContact("Jane", "Smith", "jane.smith@gmail.com");

// Test linking
linkClientContact(1, 1);
linkClientContact(1, 2);
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