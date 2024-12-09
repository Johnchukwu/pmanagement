import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Sale } from '../types/sales';

interface SalesOverviewProps {
    totalSalesToday: number;
    totalSalesThisMonth: number;
    salesData: Sale[]; 
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ totalSalesToday, totalSalesThisMonth }) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Sales Today</Typography>
                        <Typography variant="h6">${totalSalesToday}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Sales This Month</Typography>
                        <Typography variant="h6">${totalSalesThisMonth}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SalesOverview;
