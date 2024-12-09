import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Box, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import ExportButton from '../reports/ExportButton'  // Assuming you have ExportButton component
import { Expense } from '../types/expenses'
import { Sale } from '../types/sales';
import SalesOverview from '../sales/SalesOverview';

const Reports: React.FC = () => {
    const [salesData, setSalesData] = useState<Sale[]>([]);
    const [expenseData, setExpenseData] = useState<Expense[]>([]);
    const [totalSalesToday, setTotalSalesToday] = useState<number>(0);
    const [totalSalesThisMonth, setTotalSalesThisMonth] = useState<number>(0);

    // Fetch data
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:3350/api/sales');
                const formattedData = response.data.map((sale: Sale) => ({
                    transactionDate: sale.transactionDate,
                    totalAmount: sale.totalAmount,
                }));
                setSalesData(formattedData);

                // Calculate total sales today and this month
                const today = new Date();
                const todayTotal = formattedData
                    .filter((sale: Sale) => new Date(sale.transactionDate).toLocaleDateString() === today.toLocaleDateString())
                    .reduce((acc: number, sale: Sale) => acc + sale.totalAmount, 0);

                const thisMonth = formattedData
                    .filter((sale: Sale) => new Date(sale.transactionDate).getMonth() === today.getMonth())
                    .reduce((acc: number, sale: Sale) => acc + sale.totalAmount, 0);

                setTotalSalesToday(todayTotal);
                setTotalSalesThisMonth(thisMonth);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        const fetchExpenseData = async () => {
            try {
                const response = await axios.get('http://localhost:3350/api/expenses');
                const formattedData = response.data.map((expense: Expense) => ({
                    category: expense.category,
                    value: expense.amount,
                }));
                setExpenseData(formattedData);
            } catch (error) {
                console.error('Error fetching expense data:', error);
            }
        };

        fetchSalesData();
        fetchExpenseData();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Sales Reports
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6">Total Sales Today: {totalSalesToday}</Typography>
                    <Typography variant="h6">Total Sales This Month: {totalSalesThisMonth}</Typography>
                    <Button variant="contained" color="primary" onClick={() => console.log('Button Clicked')}>
                        Export Data
                    </Button>
                </CardContent>
            </Card>
            {/* Sales Overview Section */}
            <SalesOverview
                totalSalesToday={totalSalesToday}
                totalSalesThisMonth={totalSalesThisMonth}
                salesData={salesData}
            />

            {/* Sales Trends Chart */}
            <Grid container spacing={4} sx={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6}>
                    <h2>Sales Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>

                {/* Expense Breakdown Chart */}
                <Grid item xs={12} sm={6} md={6}>
                    <h2>Expense Breakdown</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#82ca9d"
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>

            {/* Export Button */}
            <ExportButton salesData={salesData} />

        </Box>
    );
};

export default Reports;
