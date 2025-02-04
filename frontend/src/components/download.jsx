import React from 'react';

const download = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions available for download.");
    return;
  }

  // Get CSV headers from the keys of the first transaction object.
  // (You might need to adjust this if some fields are nested objects.)
  const headers = Object.keys(transactions[0]);

  // Build CSV content
  let csvContent = headers.join(",") + "\n";

  transactions.forEach((transaction) => {
    const row = headers.map((header) => {
      let cell = transaction[header];

      // If the cell is an object (like a nested category), convert it to a string.
      if (typeof cell === "object" && cell !== null) {
        cell = JSON.stringify(cell);
      }
      // If the cell contains commas, quotes, or line breaks, enclose it in quotes and escape quotes.
      if (typeof cell === "string" && /[",\n]/.test(cell)) {
        cell = '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    });
    csvContent += row.join(",") + "\n";
  });

  // Create a blob with the CSV data
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create a temporary link element and click it programmatically
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};



export default download;
