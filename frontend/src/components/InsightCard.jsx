import React, { useState, useEffect } from 'react';
import useTransactions from '../hooks/useTransactions';

const InsightCard = ({ date, title, description, bodyContent, onClick }) => {
    return (
        <button onClick={onClick} className="bg-white shadow-lg rounded-sm overflow-hidden mb-4 w-full text-left">
            {/* Card Header */}
            <div className="bg-purple-800 text-white p-4">
                <h3 className="text-sm font-semibold">{date}</h3>
                <h2 className="text-lg font-semibold mt-1">{title}</h2>
                <p className="text-sm opacity-80 mt-1">{description}</p>
            </div>
            {bodyContent}
        </button>
    );
}

export default InsightCard
