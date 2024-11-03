class Client:
    def __init__(self, name, linked_contacts=None):
        self.name = name
        self.linked_contacts = linked_contacts if linked_contacts else []
        self.client_code = self.generate_client_code()

    @staticmethod
    def generate_unique_number():
        # This could be managed by checking a database or incrementing a counter.
        # Here, it's hardcoded for simplicity; ideally, this should check against existing records.
        # We'll assume a simple counter mechanism for sequential numbering.
        if not hasattr(Client, "_counter"):
            Client._counter = 1
        unique_number = f"{Client._counter:03}"
        Client._counter += 1
        return unique_number

    def generate_client_code(self):
        # Generate the code based on the client's name
        code_prefix = (self.name[:3].upper() if len(self.name) >= 3 else
                       (self.name.upper() + 'A' * (3 - len(self.name))))
        unique_number = self.generate_unique_number()
        return code_prefix + unique_number

    def add_contact(self, contact):
        # Adds a contact to the client's list of contacts
        self.linked_contacts.append(contact)
