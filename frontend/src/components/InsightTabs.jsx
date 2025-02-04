import React, { useState } from "react";

const InsightTabs = () => {
  const [activeTab, setActiveTab] = useState("Dec"); // Default to December

  const months = ["Sep", "Oct", "Nov", "Dec", "Jan"];

  return (
    <div>
      {/* Tabs Container - Full width */}
      <div className="flex border-b border-gray-300">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setActiveTab(month)}
            className={`relative flex-1 pb-2 text-sm font-medium text-center transition-all duration-300 ${
              activeTab === month
                ? "text-purple-800 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {month}
            {/* Underline animation */}
            {activeTab === month && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-800 transition-all duration-300"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content Below the Tabs */}
      <div className="mt-4">
        {activeTab === "Sep" && <p className="text-gray-700">📊 Data for September</p>}
        {activeTab === "Oct" && <p className="text-gray-700">📊 Data for October</p>}
        {activeTab === "Nov" && <p className="text-gray-700">📊 Data for November</p>}
        {activeTab === "Dec" && <p className="text-gray-700">📊 Outgoing: <span className="text-red-600">-$140.01</span> | Incoming: <span className="text-green-600">$33.00</span></p>}
        {activeTab === "Jan" && <p className="text-gray-700">📊 Data for January</p>}
      </div>
    </div>
  );
};

export default InsightTabs;
