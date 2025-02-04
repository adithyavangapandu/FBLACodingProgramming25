import React, { useState, useEffect} from 'react';
import TransactionsList from "../components/TransactionListPreview";
import useTransactions from "../hooks/useTransactions";
import Navbar from "../components/Navbar";
import download from '../components/download';
import api from "../api";
import { Link } from 'react-router-dom';



function Crud() {
  const [total, setTotal] = useState(0);
  const { transactions, setTransactions, getTransactions } = useTransactions();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);


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


  useEffect(() => {
    setCurrentDate(new Date());
    getTotal();
  }, []);




  const getTotal = () => {
    api
      .get("/api/transactions/total/")
      .then((res) => {
        const fetchedTotal = res.data.total;
        if (fetchedTotal < 0) {
          setTotal("-$" + (Math.abs(Number(fetchedTotal))).toFixed(2));
        } else {
          setTotal(`${Number(fetchedTotal).toFixed(2)}`);
        }
      })
      .catch((err) => console.error("Error fetching total:", err));
  };

  return (
    <div className="bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navbar */}
      <Navbar />

      {/* Welcome Section */}
      <div className="bg-purple-100 w-full">
        <div className="bg-purple-900 w-full">
          <main className="container mx-auto px-4 py-28 pt-6 flex flex-col items-start">
          </main>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="container px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 relative -mt-32">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4">Account</h2>
          <div className="mb-4">
            <div className="text-sm text-gray-500">CASH & SAVINGS</div>
            <div className="text-xl font-bold">{total}</div>
            <div className="text-sm text-gray-500">Available balance as of {currentDate.toLocaleDateString()}</div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-sm">Visualize your Financials</h3>
            <p className="text-sm text-gray-500 mb-2">Go to the Insights Page to see more.</p>
            <a href="/insights" className="text-purple-600 text-sm font-medium hover:underline">Learn more</a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white col-span-2 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="flex gap-2">
              <Link
                  to="/add-transaction"
                  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 inline-block"
                >
                  Add Transaction
              </Link>
              <button
                onClick={() => download(transactions)}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
              >
                Download
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="mb-4 px-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              placeholder="Min amount"
              className="px-4 py-2 border rounded"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max amount"
              className="px-4 py-2 border rounded"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2"
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
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
            onClick={() => {
              console.log("Search Filters", searchTerm, minAmount, maxAmount, category)
              getTransactions(searchTerm, minAmount, maxAmount, null, category);
              console.log("New transactions", transactions)
            }}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mb-4 ml-2"
            onClick={() => {
              setSearchTerm('');
              setMinAmount('');
              setMaxAmount('');
              setCategory('')
              getTransactions();

            }}
          >
            Reset
          </button>
          {/* Column Headers */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Description</span>
            <span className="font-semibold text-gray-700 -ml-14">Category</span>
            <span className="font-semibold text-gray-700">Date</span>
            <span className="font-semibold text-gray-700">Amount</span>
          </div>
          {/* Activity List */}
          <TransactionsList transactions={transactions} />
        </div>
      </div>


    </div>
  );
}

export default Crud;
