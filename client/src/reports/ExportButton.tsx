import React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver'; // Import file-saver to handle file downloads
import { Sale } from '../types/sales'; // Adjust the import based on your project structure

interface ExportButtonProps {
  salesData: Sale[]; // Use the Sale type instead of any
}

const ExportButton: React.FC<ExportButtonProps> = ({ salesData }) => {
  // Function to handle exporting the data as a CSV file
  const handleExport = () => {
    // Convert the sales data to CSV format
    const header = "Date,Total Sales\n"; // Define the CSV header
    const rows = salesData.map((sale) => {
        return `${sale.date},${sale.totalSales}`; // Now totalSales should be recognized
    }).join("\n");
    // Combine the header and rows
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Trigger the file download using file-saver
    saveAs(blob, "sales_data.csv");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Export Sales Data
    </Button>
  );
};

export default ExportButton;
