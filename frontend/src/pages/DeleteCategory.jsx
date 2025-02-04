import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import api from "../api"; // Assuming this is your configured API instance

const DeleteCategory = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
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

      // Show the confirmation dialog when the Delete button is clicked.
    const handleSubmit = (e) => {
        try {
            e.preventDefault(); // Prevent the form from reloading the page
            confirmDelete()
            console.log("I handled submit")
        } catch (error) {
            console.error("Error deleting transaction:", error);

        }

    };

    // Confirm deletion: send the DELETE request and then navigate away.
    const confirmDelete = async () => {
        console.log("Sent this id", category)

        try {
            await api.delete(`/api/categories/delete/${category}/`);
            navigate("/")
        } catch (error) {
        console.error("Error deleting transaction:", error);
        }
    };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Delete Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
                <label className="block font-semibold">Category</label>
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded p-2"
                required
                >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.name}
                    </option>
                ))}
                </select>
            </div>

            {/* Buttons */}
            <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-white-700 w-full"
            >
                Delete
            </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteCategory;
