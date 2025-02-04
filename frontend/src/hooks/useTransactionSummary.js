import { useEffect, useState } from "react";
import { getSortedTransactions } from "../hooks/filterTransactions";
import useTransactions from "../hooks/useTransactions";

const useTransactionSummary = (month) => {
  const { getTransactions } = useTransactions();
  const [sortedData, setSortedData] = useState({ incoming: [0, 0], outgoing: [0, 0] });
  const [labels, setLabels] = useState(["Current Month", "Previous Month"]);

  useEffect(() => {
    const fetchData = async () => {
      // Get transactions for current and previous month
      const currentTotals = await getSortedTransactions(month, getTransactions);
      console.log(currentTotals)
      const prevMonth = new Date(month);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const prevTotals = await getSortedTransactions(prevMonth, getTransactions);

      // Set labels dynamically
      const currentMonthName = new Date(month).toLocaleString("default", { month: "long" });
      const prevMonthName = prevMonth.toLocaleString("default", { month: "long" });

      setLabels([currentMonthName, prevMonthName]);

      // Set formatted data
      setSortedData({
        incoming: [currentTotals.incoming, prevTotals.incoming],
        outgoing: [currentTotals.outgoing, prevTotals.outgoing],
      });
    };

    fetchData();
  }, [month, getTransactions]);

  return { labels, sortedData };
};

export default useTransactionSummary;
