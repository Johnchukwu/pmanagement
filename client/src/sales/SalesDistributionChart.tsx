import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Sale } from '../types/sales';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const SalesDistributionChart: React.FC<{ data: Sale[] }> = ({ data }) => {
    const categories = [...new Set(data.map(sale => sale.unit))];
    const categorySales = categories.map(
        category => data
            .filter(sale => sale.unit === category)
            .reduce((acc, sale) => acc + sale.totalAmount, 0)
    );

    const chartData = {
        labels: categories,
        datasets: [
            {
                data: categorySales,
                backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'], // Customize colors
                borderColor: ['#2980b9', '#c0392b', '#27ae60', '#f1c40f'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem: TooltipItem<'pie'>) {
                        return '$' + tooltipItem.raw;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h3>Sales Distribution</h3>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default SalesDistributionChart;
