//app/admin/page.js
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const addUser = async () => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, age: Number(age), address, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("User added successfully!");
        setEmail("");
        setName("");
        setAge("");
        setAddress("");
        setPhone("");
      } else {
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("Failed to add user.");
    }
  };

  // Helper function to capitalize the first letter of each word
  const capitalizeWords = (input) => {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Add User</h1>

      <div className="grid grid-cols-1 gap-4 max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(capitalizeWords(e.target.value))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={addUser}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add User
        </button>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
