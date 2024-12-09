import React from 'react';

interface Sale {
    date: string;
    amount: number;
    itemsSold: number;
    category: string;
}

const ExportButton: React.FC<{ salesData: Sale[] }> = ({ salesData }) => {
    const handleExport = () => {
        const csvRows = [];
        const headers = ['Date', 'Amount', 'Items Sold', 'Category'];
        csvRows.push(headers.join(','));

        salesData.forEach((sale) => {
            const row = [new Date(sale.date).toLocaleDateString(), sale.amount, sale.itemsSold, sale.category];
            csvRows.push(row.join(','));
        });

        const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(csvData);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'sales_data.csv');
        a.click();
    };

    return (
        <button className="export-button" onClick={handleExport}>
            Export Data as CSV
        </button>
    );
};

export default ExportButton;
