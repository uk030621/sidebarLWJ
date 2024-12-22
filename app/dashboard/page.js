"use client";

import { useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper to clear messages
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // Fetch user data by email
  const fetchData = async () => {
    clearMessages();
    setUserData(null);

    try {
      const response = await fetch(`/api/data?email=${email}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }
  };

  // Create a new user
  const createUser = async () => {
    clearMessages();

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
      } else {
        setError(data.error || "Failed to create user.");
      }
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  // Update user data
  const updateUser = async () => {
    clearMessages();

    try {
      const response = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User updated successfully!");
        setUserData("");
        setEmail("");
      } else {
        setError(data.error || "Failed to update user.");
      }
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  // Delete user data
  const deleteUser = async () => {
    clearMessages();

    try {
      const response = await fetch("/api/data", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User deleted successfully!");
        setUserData(null);
      } else {
        setError(data.error || "Failed to delete user.");
      }
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Input to fetch data */}
      <div className="flex flex-col max-w-md gap-4">
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <div className="flex gap-4">
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Fetch Data
          </button>
          {/*<button
            onClick={createUser}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Create User
          </button>*/}
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}

      {/* Form to display and edit fetched data */}
      {userData && (
        <form className="mt-8 p-4 border rounded shadow-md max-w-md bg-gray-50">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              disabled // Email should be immutable
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={updateUser}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={deleteUser}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Delete User
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
