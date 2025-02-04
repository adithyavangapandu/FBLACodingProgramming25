import { useState, useEffect } from 'react';
import api from '../api';

const totalData = () => {
    const [categoryDataOutgoing, setCategoryDataOutgoing] = useState({ labels: [], data: [] });
    const [categoryDataIncoming, setCategoryDataIncoming] = useState({ labels: [], data: [] });

    // Fetch category transaction data from backend
    useEffect(() => {
      api
        .get("/api/category-pie-graph-outgoing/")
        .then((res) => {
          setCategoryDataOutgoing(res.data);
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


    // Default constants for the maximum values.
    let maxLabel = null;
    let maxData = null;

    if (categoryDataIncoming.data.length > 0 && categoryDataIncoming.labels.length > 0) {
      // Find the maximum data value.
      maxData = Math.max(...data);
      // Get the index of that maximum value.
      const maxIndex = data.indexOf(maxData);
      // Use that index to get the corresponding label.
      maxLabel = labels[maxIndex];
    }

    let lowestLabel = null;
    let lowestData = null;

    if (categoryDataOutgoing.data.length > 0 && categoryDataOutgoing.labels.length > 0) {
      // Find the minimum data value.
      lowestData = Math.min(...data);
      // Get the index of the lowest value.
      const lowestIndex = data.indexOf(lowestData);
      // Use that index to retrieve the corresponding label.
      lowestLabel = labels[lowestIndex];
    }

};

export default totalData;
