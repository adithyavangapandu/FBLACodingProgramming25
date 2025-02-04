import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import api from "../api"; // Assuming this is your configured API instance

const AddCategory = () => {
  const [name, setName] = useState("");
  const [outgoing, setOutgoing] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();






  const handleSubmit = (e) => {
    e.preventDefault();





    // Build transaction data
    const newCategory = {
      name,
      outgoing // Send category ID
    };

    // Send data to the backend
    api
      .post("/api/categories/", newCategory)
      .then((res) => {
        navigate("/"); // Redirect to home page
      })
      .catch((err) => {
        console.error("Error adding transaction:", err.response?.data);
        alert("Failed to add transaction");
      });
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="inline-flex items-center">
                <input
                type="checkbox"
                checked={outgoing}
                onChange={(e) => setOutgoing(e.target.checked)}
                className="form-checkbox"
                />
                <span className="ml-2 block font-semibold">Check if outgoing</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
