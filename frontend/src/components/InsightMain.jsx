import React, { useState, useEffect } from "react";
import InsightTabs from "./InsightTabs"
import totalData from "../hooks/getMonthData";
import api from "../api";


const InsightMain = () => {

  const [extrema, setExtrema] = useState(0);
  const [total, setTotal] = useState(0);

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

    useEffect(() => {
        getTotal();
        getExtrema();
      }, []);

    const getExtrema = () => {
        api
            .get("/api/transactions/extrema/")
            .then((res) => {
            const fetchedExtrema = res.data;
            setExtrema(fetchedExtrema)
            })
            .catch((err) => console.error("Error fetching total:", err));
    };
    return (
        <div className="bg-white shadow-lg p-6 mt-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Cash flow summary</h3>
            <p className="text-sm text-gray-600 mt-2">
            Here’s a breakdown of your activity.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mt-4 flex items-center">
            <div className="text-gray-800">
                <p className="text-sm">📄 Your Account</p>
                <p className={`text-lg font-semibold ${total > 0 ? 'text-green-600' : 'text-red-600'}`}>
                Total Cash Flow: {total}
                </p>
            </div>
            </div>

            <h4 className="text-md font-semibold text-gray-700 mt-6">Your total activity:</h4>


            <div className="mt-6 flex justify-between">
            <div className="text-center">
                <p className="text-gray-800 text-lg font-semibold">{extrema.highest_gain}</p>
                <p className="text-gray-500 text-sm">Biggest Gain</p>
            </div>

            <div className="text-center">
                <p className="text-gray-800 text-lg font-semibold">{extrema.largest_expense}</p>
                <p className="text-gray-500 text-sm">Biggest Expense</p>
            </div>
            </div>
        </div>
    );

}

export default InsightMain