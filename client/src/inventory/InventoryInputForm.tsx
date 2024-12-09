import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Sale } from '../types/sales';

type ItemField = keyof Sale['items'][0];

interface SalesInputFormProps {
    sale: Sale | null;
    setEditingSale: React.Dispatch<React.SetStateAction<Sale | null>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchSalesData: () => void;
}

const SalesInputForm: React.FC<SalesInputFormProps> = ({
    sale,
    setEditingSale,
    open,
    setOpen,
    fetchSalesData,
}) => {
    const [unit, setUnit] = useState(sale ? sale.unit : '');
    const [items, setItems] = useState(sale ? sale.items : [{ itemName: '', quantity: 0, unitPrice: 0, total: 0 }]);
    const [totalAmount, setTotalAmount] = useState(sale ? sale.totalAmount : 0);
    const [transactionDate, setTransactionDate] = useState<string>(sale ? new Date(sale.transactionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (sale) {
            setUnit(sale.unit);
            setItems(sale.items);
            setTotalAmount(sale.totalAmount);
            setTransactionDate(new Date(sale.transactionDate).toISOString().split('T')[0]);
        }
    }, [sale]);

    const handleItemChange = (index: number, field: ItemField, value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };

        // Update total for the item
        newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
        setItems(newItems);

        // Update totalAmount
        const newTotalAmount = newItems.reduce((acc, item) => acc + item.total, 0);
        setTotalAmount(newTotalAmount);
    };

    const handleSubmit = async () => {
        try {
            const saleData = { unit, items, totalAmount, transactionDate };

            if (sale) {
                // If it's an update
                await axios.put(`http://localhost:3350/api/sales/${sale._id}`, saleData);
                alert('Sale updated successfully');
            } else {
                // If it's a new sale
                await axios.post('http://localhost:3350/api/sales', saleData);
                alert('Sale added successfully');
            }

            fetchSalesData(); // Re-fetch the sales data
            setOpen(false); // Close the form
            setEditingSale(null); // Clear the editing sale
        } catch (error) {
            console.error('Error submitting sale:', error);
            alert('Error adding or updating sale');
        }
    };

    const handleCancel = () => {
        setEditingSale(null); // Clear the editing sale when canceling
        setOpen(false); // Close the form
    };

    const handleAddItem = () => {
        setItems([...items, { itemName: '', quantity: 0, unitPrice: 0, total: 0 }]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        const newTotalAmount = newItems.reduce((acc, item) => acc + item.total, 0);
        setTotalAmount(newTotalAmount);
    };

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>{sale ? 'Edit Sale' : 'Add Sale'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Transaction Date"
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {items.map((item, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <TextField
                            label="Item Name"
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Unit Price"
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Total"
                            type="number"
                            value={item.total}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            onClick={() => handleRemoveItem(index)}
                            color="error"
                            fullWidth
                        >
                            Remove Item
                        </Button>
                    </div>
                ))}
                <Button onClick={handleAddItem} fullWidth>
                    Add Item
                </Button>
                <div>
                    <strong>Total Amount: ${totalAmount}</strong>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">{sale ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SalesInputForm;
