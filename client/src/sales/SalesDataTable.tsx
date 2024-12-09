import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Sale } from '../types/sales';
import { Dispatch, SetStateAction } from 'react';

interface SalesDataTableProps {
    salesData: Sale[];
    handleDelete: (id: string) => void;
    setEditingSale: Dispatch<SetStateAction<Sale | null>>;
}

const SalesDataTable: React.FC<SalesDataTableProps> = ({ salesData, handleDelete, setEditingSale }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Items Sold</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {salesData.map((sale) => (
                        <TableRow key={sale._id}>
                            <TableCell>{new Date(sale.transactionDate).toLocaleDateString()}</TableCell>
                            <TableCell>${sale.totalAmount}</TableCell>
                            {/* Ensure that sale.items is defined and has a length */}
                            <TableCell>
                                {Array.isArray(sale.items) && sale.items.length > 0
                                    ? sale.items.reduce((sum, item) => sum + item.quantity, 0)
                                    : 0}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => setEditingSale(sale)}>Edit</Button>
                                <Button onClick={() => handleDelete(sale._id)} color="error">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SalesDataTable;
