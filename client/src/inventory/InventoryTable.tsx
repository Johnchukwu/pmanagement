import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { InventoryItem } from '../types/inventory';

interface InventoryTableProps {
    inventory: InventoryItem[];
    handleDelete: (id: string) => void;
    handleEdit: (item: InventoryItem) => void;  // Handle edit
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, handleDelete, handleEdit }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventory.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.unitPrice}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(item)}>Edit</Button> {/* Edit button */}
                                <Button onClick={() => handleDelete(item._id)} color="error">
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

export default InventoryTable;
