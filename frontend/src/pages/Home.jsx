import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TransactionsList from "../components/TransactionListPreview";
import Navbar from "../components/Navbar"
import api from "../api";
import useTransactions from "../hooks/useTransactions";

function Home() {
  const { transactions } = useTransactions();
  const [total, setTotal] = useState(0);
  const [positiveSum, setPositiveSum] = useState(0);
  const [negativeSum, setNegativeSum] = useState(0);

  useEffect(() => {
    getTotal();
    calculateSums();
  }, [transactions]);

  const calculateSums = () => {
    let posSum = 0;
    let negSum = 0;
    transactions.forEach((transaction) => {
      console.log(transaction.Location, transaction.amount)
      if (transaction.amount > 0) {
        posSum += Number(transaction.amount);
        console.log("Iterated", posSum)

      } else {
        negSum += Number(-transaction.amount);
      }
    });
    setPositiveSum(posSum);
    setNegativeSum(negSum);
  };


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
    <div className="bg-gray-100">
      <Navbar />

      {/* Welcome Section */}
      <div className="bg-purple-100 w-full">
        <div className="bg-purple-200 w-full">
          <main className="container mx-auto px-4 py-16 pt-6 flex flex-col items-start">
            {/* Header Row */}
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-purple-900">Hello User!</h1>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800">
                <Link to="/add-transaction">Add Transaction</Link>
              </button>
              <button className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800">
              <Link to="/add-category">Add Category</Link>
              </button>
              <button className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800">
              <Link to="/delete-category">Delete Category</Link>
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative -mt-8">
        {/* Accounts Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600">Total</p>
              <h3 className="text-xl font-semibold">{total}</h3>
              <p className="text-sm text-gray-500">Financial Tracker</p>
            </div>
            <button className="text-gray-600 hover:text-gray-800">...</button>
          </div>
          <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800">
            View All Accounts
          </button>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="flex justify-between mb-2 border-b pb-2">
            <span className="font-semibold text-gray-700">Location</span>
            <span className="font-semibold text-gray-700">Amount</span>
          </div>
            <TransactionsList transactions={transactions} />
            <Link to="/manage-transactions" className="text-purple-700 hover:underline mt-4 inline-block">
              See all Transactions
            </Link>
        </div>
        {/*
        GOING TO PUT THE COMPONENT INSTEAD
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="flex justify-between mb-2 border-b pb-2">
            <span className="font-semibold text-gray-700">Description</span>
            <span className="font-semibold text-gray-700">Amount</span>
          </div>
          <ul className="divide-y">
            <li className="py-2 flex justify-between">
              <span>DEBIT CARD PURCHASE</span>
              <span className="text-red-600">-$2.75</span>
            </li>
          </ul>
          <a href="#" className="text-purple-700 hover:underline mt-4 inline-block">
            View All Activity
          </a>
        </div>
        */}


        {/* Insights */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Insights</h2>
          <div className="bg-purple-100 p-4 rounded mb-4">
            <p className="text-sm text-gray-700">Jan 20</p>
            <p className="text-lg font-semibold">Upcoming Activity</p>
            <div className="flex justify-between items-center mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Outgoing</p>
                <p className="text-xl text-red-600">-${negativeSum}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Incoming</p>
                <p className="text-xl text-green-600">${positiveSum}</p>
              </div>
            </div>
            <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 mt-4">
              <Link to="/insights">Add Transaction</Link>
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;
