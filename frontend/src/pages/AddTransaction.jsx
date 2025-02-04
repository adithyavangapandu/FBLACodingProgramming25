import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import api from "../api"; // Assuming this is your configured API instance

const AddTransaction = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();



    // ✅ Fetch categories from the backend on component mount
  useEffect(() => {
      api
        .get("/api/categories/")
        .then((res) => {
          setCategories(res.data); // ✅ Set categories in state
        })
        .catch((err) => {
          console.error("Error fetching categories:", err.response?.data);
        });
    }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const selectedCategory = categories.find(cat => cat.id === parseInt(category));

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    const amountValue = parseFloat(amount);
    const isOutgoingAmount = amountValue < 0;
    const isOutgoingCategory = selectedCategory.outgoing;


    if (isOutgoingAmount !== isOutgoingCategory) {
      setError(`Amount ${isOutgoingAmount ? 'should be positive' : 'should be negative'} for ${selectedCategory.outgoing ? 'outgoing' : 'incoming'} category.`);
      return;
    }


    // Build transaction data
    const newTransaction = {
      Location: location,
      description,
      amount,
      category: category // Send category ID
    };
    console.log("New Transaction", newTransaction)

    // Send data to the backend
    api
      .post("/api/transactions/", newTransaction)
      .then((res) => {
        console.log("Transaction added:", res.data);
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
        <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="" disabled>Select a category</option>
              {/* Display outgoing categories */}
              <optgroup label="Outgoing">
                {categories
                  .filter((cat) => cat.outgoing)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </optgroup>

              {/* Display incoming categories */}
              <optgroup label="Incoming">
                {categories
                  .filter((cat) => !cat.outgoing)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
              rows="4"
            ></textarea>
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

export default AddTransaction;
