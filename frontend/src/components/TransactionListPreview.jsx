import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from "../api";


const TransactionsList = ({ transactions }) => {
    // Create an empty array to hold the list items.
    const listItems = [];

    const [categories, setCategories] = useState([]);
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

    const mapCategories = (num) => {
      const name = categories.find(category => category.id === num);
      return name ? name.name : null;
    }
    const dateFormat = (date) => {
      return date.substring(0, 10);
    }

    if (transactions && transactions.length > 0) {
      // Iterate over transactions using a for loop.
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const amountNumber = Number(transaction.amount);
        listItems.push(
          <li key={transaction.id} className="py-2 flex justify-between">
            <Link
              to={`/view-transaction/${transaction.id}`}
              className="hover:underline text-blue-600"
            >
              <span>{transaction.Location}</span>
            </Link>
            <span>{mapCategories(transaction.category)}</span>
            <span>{dateFormat(transaction.created_at)}</span>

            <span className={`text-${amountNumber < 0 ? "red" : "green"}-600`}>
              {amountNumber < 0
                ? `-$${Math.abs(amountNumber)}`
                : `$${transaction.amount}`}
            </span>
          </li>
        );
      }
    } else {
      // If no transactions are found, add a fallback message.
      listItems.push(
        <p key="no-transactions" className="text-gray-500 mt-4">
          No transactions found.
        </p>
      );
    }
  return (
    <div>
      <ul className="divide-y">{listItems}</ul>
    </div>
  );
};

export default TransactionsList;
