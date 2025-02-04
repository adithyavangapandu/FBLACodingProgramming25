import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import Navbar from "../components/Navbar";
import api from '../api';

const TransactionModify = () => {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [categories, setCategories] = useState([]);

  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // State to control the confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);


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


  // When transactions are loaded, find the one matching the provided id.
  useEffect(() => {
    if (transactions && transactions.length > 0) {

      console.log("Transactions", transactions)
      const foundTransaction = transactions.find(
        (transaction) => transaction.id === Number(id)
      );
      setTransaction(foundTransaction);

    }
  }, [transactions, id]);

  // When the transaction is loaded, initialize the form fields.
  useEffect(() => {
    if (transaction) {
      setLocation(transaction.Location);
      setAmount(transaction.amount);
      setCategory(transaction.category);
    }
  }, [transaction]);

  // Handle the modify/update form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/transactions/${transaction.id}/`, {
        Location: location,
        amount: amount,
        category: category,
      });
      navigate('/manage-transactions');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Show the confirmation dialog when the Delete button is clicked.
  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  // Confirm deletion: send the DELETE request and then navigate away.
  const confirmDelete = async () => {
    try {
      await api.delete(`/api/transactions/delete/${transaction.id}/`);
      navigate('/manage-transactions');
    } catch (error) {
      console.error("Error deleting transaction:", error);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 pl-4 py-4 bg-white shadow-md rounded-lg">
        {/* Form Header */}
        <h2 className="text-xl font-semibold text-gray-800">Transaction Information</h2>
        <p className="text-sm text-gray-500">Click modify to make changes.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

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
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
          >
            Modify
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Delete
          </button>
        </form>
      </div>

      {/* Confirmation Dialog Modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionModify;
