// A simple in-memory "database" to store clients
let clients = [];
console.log("Client Management System is running...");

// Function to add a client
function addClient(name, email) {
    const client = {
        id: clients.length + 1,
        name: name,
        email: email
    };
    clients.push(client);
    console.log(`Client added: ${name}`);
}

// Function to list all clients
function listClients() {
    console.log("Client List:");
    clients.forEach(client => {
        console.log(`ID: ${client.id}, Name: ${client.name}, Email: ${client.email}`);
    });
}

// Function to remove a client by ID
function removeClient(id) {
    clients = clients.filter(client => client.id !== id);
    console.log(`Client with ID ${id} removed.`);
}

// Example usage
addClient("Alice", "alice@example.com");
addClient("Bob", "bob@example.com");
listClients();
removeClient(1);
listClients();
