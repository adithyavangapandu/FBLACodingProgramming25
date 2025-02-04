export const getSortedTransactions = async (month, getTransactions) => {
    try {
      // Fetch transactions for the given month
      await getTransactions("", "", "", month);
      const transactions = getTransactions().transactions;

      // Calculate total incoming (positive) and outgoing (negative) money
      const totals = transactions.reduce(
        (acc, transaction) => {
          const amount = parseFloat(transaction.amount);
          if (amount > 0) {
            acc.incoming += amount; // Add to total incoming
          } else {
            acc.outgoing += Math.abs(amount); // Convert to positive for outgoing total
          }
          return acc;
        },
        { incoming: 0, outgoing: 0 } // Initial totals
      );

      return totals; // { incoming: XX, outgoing: YY }
    } catch (error) {
      console.error("Error calculating transaction totals:", error);
      return { incoming: 0, outgoing: 0 }; // Return default values on error
    }
  };
