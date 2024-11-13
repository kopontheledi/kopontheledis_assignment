// // import React, { useState } from 'react';

// // function ClientForm({ onCreateClient }) {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [code, setCode] = useState('');
// //   const [isSaved, setIsSaved] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!name || !email) {
// //       alert("Name and email are required.");
// //       return;
// //     }
    
// //     // Call the backend API to create the client
// //     const response = await fetch('http://localhost:5000/clients', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ name, email }),
// //     });
    
// //     if (response.ok) {
// //       const client = await response.json();
// //       setCode(client.code);  // Set the generated code after client is saved
// //       setIsSaved(true);       // Mark as saved
// //       onCreateClient(client); // Notify parent to update client list
// //     } else {
// //       const errorData = await response.json();
// //       alert(`Error: ${errorData.error}`);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h3>Add Client</h3>
// //       <input
// //         type="text"
// //         placeholder="Client Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         required
// //       />
// //       <input
// //         type="email"
// //         placeholder="Client Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //         required
// //       />
// //       <button type="submit">Add Client</button>

// //       {isSaved && (
// //         <div>
// //           <h4>Client saved successfully!</h4>
// //           <p>Code: {code}</p> {/* Show the generated client code */}
// //         </div>
// //       )}
// //     </form>
// //   );
// // }

// // export default ClientForm;

// import React, { useState } from 'react';

// function ClientForm({ onCreateClient }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [isSaved, setIsSaved] = useState(false);

//   // Function to generate a unique 6-character client code
//   const generateClientCode = () => {
//     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const numbers = '0123456789';
//     const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
//     const randomNumbers = Array.from({ length: 3 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
//     return randomLetters + randomNumbers;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email) {
//       alert("Name and email are required.");
//       return;
//     }

//     const newCode = generateClientCode();

//     // Call the backend API to create the client
//     const response = await fetch('http://localhost:5000/clients', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, code: newCode }),
//     });

//     if (response.ok) {
//       const client = await response.json();
//       setCode(client.code);
//       setIsSaved(true);
//       onCreateClient(client);
//     } else {
//       const errorData = await response.json();
//       alert(`Error: ${errorData.error}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Client</h3>
//       <input
//         type="text"
//         placeholder="Client Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Client Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit">Add Client</button>

//       {isSaved && (
//         <div>
//           <h4>Client saved successfully!</h4>
//           <p>Code: {code}</p>
//         </div>
//       )}
//     </form>
//   );
// }

// export default ClientForm;

import React, { useState } from 'react';

function ClientForm({ onCreateClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Function to generate a unique 6-character client code
  const generateClientCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    const randomNumbers = Array.from({ length: 3 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
    return randomLetters + randomNumbers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    const newCode = generateClientCode();

    // Call the backend API to create the client
    const response = await fetch('http://localhost:5000/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, code: newCode }),
    });

    if (response.ok) {
      const client = await response.json();
      setCode(client.code);
      setIsSaved(true);
      onCreateClient(client);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Client</h3>
      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Client Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add Client</button>

      {isSaved && (
        <div>
          <h4>Client saved successfully!</h4>
          <p>Code: {code}</p>
        </div>
      )}
    </form>
  );
}

export default ClientForm;
