import React, { useState, useEffect }  from "react";
import { Bar } from 'react-chartjs-2';
import api from "../api"; // Your API instance



const TwoMonths = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    const [currentNums, setCurrentNums] = useState([0, 0]);
    const [prevNums, setPrevNums] = useState([0, 0]);
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    const curMonthName = months[currentMonth-1]
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Handle January case
    const prevMonthName = months[prevMonth-1]


    useEffect(() => {
        const fetchGraphData = async () => {
            console.log("THis is current Month", currentMonth)
            console.log("THis is current Month", prevMonth)

             // Fetch data for the current month
            api
            .post("/api/bar-graph/", { number: currentMonth })
            .then((res) => {
                console.log("current month data", res.data)
                setCurrentNums(res.data);
            })
            .catch((err) => console.error("Error fetching current month data:", err));

            // Fetch data for the previous month
            api
            .post("/api/bar-graph/", { number: prevMonth })
            .then((res) => {
                console.log("Prevmonth data", res.data)
                setPrevNums(res.data);
            })
            .catch((err) => console.error("Error fetching previous month data:", err));
        };


        fetchGraphData();
        // Only runs once when the component mounts
    }, []); // Ensures the function runs when the hook initializes



    return (
    <div>
        <div className="p-4">
        <Bar
            data={{
            labels: [prevMonthName,curMonthName], // Dynamically set month names
            datasets: [
                {
                label: "Total Incoming",
                data: [prevNums.incoming,currentNums.incoming],
                backgroundColor: "green",
                },
                {
                label: "Total Outgoing",
                data: [prevNums.outgoing, currentNums.outgoing],
                backgroundColor: "red",
                },
            ],
            }}
            options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                display: true,
                text: "Transaction Summary",
                },
                legend: {
                display: false, // Hides the legend
                },
            },
            scales: {
                y: {
                    ticks: {
                        callback: (value) => (value ===0 ? '': value),
                    },
                },
            },
            }}
        />
        </div>
    </div>
    );
}

export default TwoMonths;