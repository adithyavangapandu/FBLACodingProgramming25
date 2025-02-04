import { useState, useEffect } from 'react';
import api from '../api';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);


  const getTransactions = async (searchTerm = '', minAmount = '', maxAmount = '', month = null, category = null) => {
    try {
      const response = await api.get('/api/transactions/');
      let filteredTransactions = response.data;
      console.log(filteredTransactions)
      console.log("month input=",month)
      if (month !== null) {
        console.log("month term filter applied", month)

        filteredTransactions = filteredTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.created_at);
          const transactionMonth = transactionDate.getMonth()
          console.log("Transaction Date:", transactionDate.getMonth());

          return transactionMonth === month;
        });
        console.log("After month", filteredTransactions)
      } else {
        console.log('No month term filter applied.');
      }

      if (category) {
        const filteredByCategory = [];
        for (let i = 0; i < filteredTransactions.length; i++) {
          const transaction = filteredTransactions[i];
          if (transaction.category - category <= 0.1 &&
            transaction.category - category >= -0.1
          ) {
            filteredByCategory.push(transaction);
          }
        }
        filteredTransactions = filteredByCategory;
      } else {
        console.log('No category filter applied.');
      }


      if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(transaction =>
          transaction.Location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        console.log('No search term filter applied.');
      }

      if (minAmount !== '') {
        console.log('Filtering by min amount:', minAmount);
        filteredTransactions = filteredTransactions.filter(transaction =>
          parseFloat(transaction.amount) >= parseFloat(minAmount)
        );
      } else {
        console.log('No min amount filter applied.');
      }

      if (maxAmount !== '') {
        console.log('Filtering by max amount:', maxAmount);
        filteredTransactions = filteredTransactions.filter(transaction =>
          parseFloat(transaction.amount) <= parseFloat(maxAmount)
        );
      } else {
        console.log('No max amount filter applied.');
      }

      setTransactions(filteredTransactions);
      console.log('Final transactions state:', filteredTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, getTransactions };
};

export default useTransactions;
