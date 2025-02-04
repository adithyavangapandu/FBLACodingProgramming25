import React, { useState, useEffect }  from "react";
import { Pie } from 'react-chartjs-2';
import api from "../api"; // Your API instance



const CategoryPies = () => {
    const [categoryData, setCategoryData] = useState({ labels: [], data: [] });
    const [categoryDataIncoming, setCategoryDataIncoming] = useState({ labels: [], data: [] });

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

    // Fetch category transaction data from backend
    useEffect(() => {
      api
        .get("/api/category-pie-graph-incoming/")
        .then((res) => {
          setCategoryDataIncoming(res.data);
        })
        .catch((err) => {
          console.error("Error fetching category data:", err.response?.data);
        });
    }, []);


    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Outgoing Cash</h3>
                <p className="text-sm text-gray-600 mt-2">
                Here's a glimpse of your outgoing cash flow.
                </p>
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
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Incoming Cash</h3>
                <p className="text-sm text-gray-600 mt-2">
                Here's a glimpse of your incoming cash flow.
                </p>
                <Pie
                    data={{
                    labels: categoryDataIncoming.labels,
                    datasets: [
                        {
                        data: categoryDataIncoming.data,
                        backgroundColor: [
                            "#4CAF50",
                            "#FF9800",
                            "#9C27B0",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",

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
            </div>
        </div>
    );
}

export default CategoryPies;