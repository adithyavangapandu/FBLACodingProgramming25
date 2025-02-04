import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';

function ViewTransaction() {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const foundTransaction = transactions[parseInt(id)];
      setTransaction(foundTransaction);
    }
  }, [transactions, id]);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Form Header */}
      <h2 className="text-xl font-semibold text-gray-800">Transaction Information</h2>
      <p className="text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
      {transaction ? (
        <div>
          <p>Location: {transaction.Location}</p>
          <p>Amount: {transaction.amount}</p>
          {/* Add more details here */}
        </div>
      ) : (
        <p>Loading transaction details...</p>
      )}
    </div>
  );
}

export default ViewTransaction;
