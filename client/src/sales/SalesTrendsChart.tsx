import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TooltipItem } from 'chart.js';
import { Sale } from '../types/sales';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesTrendsChart: React.FC<{ data: Sale[] }> = ({ data }) => {
    // Ensure `data` is valid and has the expected structure
    if (!data || data.length === 0) {
        return <div>No sales data available</div>;
    }

    // Use transactionDate for the x-axis labels and totalAmount for the y-axis values
    const chartData = {
        labels: data.map(sale => new Date(sale.transactionDate).toLocaleDateString()),  // Correctly use transactionDate
        datasets: [{
            label: 'Sales Amount',
            data: data.map(sale => sale.totalAmount || 0), // Ensure totalAmount is valid
            fill: false,
            borderColor: '#3498db',
            tension: 0.1,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem: TooltipItem<'line'>) {
                        return '$' + tooltipItem.raw;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Amount ($)',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h3>Sales Trends</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default SalesTrendsChart;
