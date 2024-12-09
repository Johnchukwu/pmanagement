import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Button } from '@mui/material';
import SalesOverview from '../sales/SalesOverview';
import SalesDataTable from '../sales/SalesDataTable';
import SalesTrendsChart from '../sales/SalesTrendsChart';
import SalesDistributionChart from '../sales/SalesDistributionChart';
import SalesInputForm from '../sales/SalesInputForm';
import ExportButton from '../sales/ExportButton';
import { Sale } from '../types/sales';

const SalesPage: React.FC = () => {
    const [salesData, setSalesData] = useState<Sale[]>([]);
    const [editingSale, setEditingSale] = useState<Sale | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [totalSalesToday, setTotalSalesToday] = useState<number>(0);
    const [totalSalesThisMonth, setTotalSalesThisMonth] = useState<number>(0);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get<Sale[]>('http://localhost:3350/api/sales');
                setSalesData(response.data);  // Update state with the new sales data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching sales data:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
    
        fetchSalesData();
    }, []);
    
    useEffect(() => {
        // Calculate total sales for today and this month
        const today = new Date();
        const todaySales = salesData.filter(sale => new Date(sale.transactionDate).toDateString() === today.toDateString());
        const thisMonthSales = salesData.filter(sale => new Date(sale.transactionDate).getMonth() === today.getMonth() && new Date(sale.transactionDate).getFullYear() === today.getFullYear());
    
        setTotalSalesToday(todaySales.reduce((acc, sale) => acc + sale.totalAmount, 0));
        setTotalSalesThisMonth(thisMonthSales.reduce((acc, sale) => acc + sale.totalAmount, 0));
    }, [salesData]);
    

    // Handle deleting sales data
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3350/api/sales/${id}`);
            setSalesData(salesData.filter((sale) => sale._id !== id)); // Remove from state
            alert('Sale deleted successfully');
        } catch (error) {
            console.error('Error deleting sale:', error);
            alert('Error deleting sale');
        }
    };

    // Function to open the form to add a new sale
    const handleAddNewSale = () => {
        setEditingSale(null); // Set the form to "Add" mode
        setOpen(true); // Open the form
    };

    return (
        <Box sx={{ margin: '20px' }}>
            {/* Sales Overview Section */}
            <SalesOverview 
                salesData={salesData} 
                totalSalesToday={totalSalesToday} 
                totalSalesThisMonth={totalSalesThisMonth} 
            />

            {/* Button to open input form */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewSale} // Open form in "Add" mode
                sx={{ marginBottom: '20px' }}
            >
                Add New Sale
            </Button>

            {/* Sales Data Table */}
            <SalesDataTable salesData={salesData} handleDelete={handleDelete} setEditingSale={setEditingSale} />

            {/* Sales Trends and Sales Distribution Chart */}
            <Grid container spacing={4} sx={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6}>
                    <SalesTrendsChart data={salesData} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <SalesDistributionChart data={salesData} />
                </Grid>
            </Grid>

            {/* Export Button */}
            <ExportButton salesData={salesData} />

            {/* Sales Input Form (For Adding or Editing Sales) */}
            <SalesInputForm
                sale={editingSale}
                fetchSalesData={() => {}}
                setEditingSale={setEditingSale}
                open={open}
                setOpen={setOpen}
            />
        </Box>
    );
};

export default SalesPage;
