
import React, { useState, useEffect }  from "react";
import InsightCard from "../components/InsightCard"
import Navbar from "../components/Navbar"
import TwoMonths from "../components/TwoMonths";
import CategoryPies from "../components/CategoryPies";
import InsightMain from "../components/InsightMain";
import useTransactions from "../hooks/useTransactions";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,
  LinearScale, BarElement, Title,
  Tooltip, Legend, ArcElement } from 'chart.js';
import api from "../api"; // Your API instance


ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Insights = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [mainContent, setMainContent] = useState(
    <InsightMain />
  );

  const handleInsightClick = (content) => {
    setMainContent(content);
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const { transactions, getTransactions } = useTransactions();
  const [januaryTransactions, setJanuaryTransactions] = useState([]);

  useEffect(() => {
    const fetchJanuaryTransactions = async () => {
      const specificMonth = new Date();
      console.log("Month=", specificMonth.getUTCMonth());
      await getTransactions("", "", "", specificMonth.getUTCMonth());
      console.log("Got Transactions", transactions);
    };

    fetchJanuaryTransactions();
    // Only runs once when the component mounts
  }, []); // Ensures the function runs when the hook initializes

  useEffect(() => {
    setJanuaryTransactions(transactions); // Update state when transactions change
  }, [transactions]);

  const [categoryData, setCategoryData] = useState({ labels: [], data: [] });
  // Fetch category transaction data from backend
  useEffect(() => {
    api
      .get("/api/category-pie-graph-outgoing/")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching category data:", err.response?.data);
      });
  }, []);

  return (
    <div>
    <Navbar />
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto h-screen">
        <h2 className="text-xl font-semibold text-gray-800">💡 5 Insights</h2>
        <p className="text-sm text-gray-500 mb-4">What are insights?</p>

        <InsightCard
            date={currentDate.toLocaleDateString()}
            title="Two Months"
            description="View your monthly purchase history"
            bodyContent={
            <TwoMonths />
          }
          onClick={() => handleInsightClick(
            <TwoMonths />
          )}
        />


        <InsightCard
          date={currentDate.toLocaleDateString()}
          title="Cash flow summary"
          description="Here's a glimpse of your cash flow so far this month."
          bodyContent={
            categoryData.labels.length > 0 ? (
              <Pie
                data={{
                  labels: categoryData.labels,
                  datasets: [
                    {
                      data: categoryData.data,
                      backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4CAF50",
                        "#FF9800",
                        "#9C27B0"
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "bottom" },
                    title: {
                      display: true,
                      text: "Spending by Category",
                    },
                  },
                }}
              />
            ) : (
              <p className="text-gray-600">No transactions available.</p>
            )
          }
          onClick={() => handleInsightClick(
            <CategoryPies />
          )}
        />
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <a href="#" className="text-purple-700 text-sm">← Home</a>
          <a href="#" className="text-gray-500 text-sm">⚙ Insights settings</a>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">💡 Insights</h2>

        {/* Cash Flow Summary */}
        {mainContent}
      </main>
    </div>
    </div>
  );
};

export default Insights;
