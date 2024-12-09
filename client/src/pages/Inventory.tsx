import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import InventoryOverview from '../inventory/InventoryOverview'; 
import InventoryInputForm from '../inventory/InventoryInputForm';
import InventoryTable from '../inventory/InventoryTable';
import ExportButton from '../inventory/ExportButton';
import { InventoryItem } from '../types/inventory';

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    // Fetch inventory data from the backend
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get<InventoryItem[]>('http://localhost:3350/api/inventory');
                setInventory(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);

    // Handle Delete Operation
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3350/api/inventory/${id}`);
            setInventory(inventory.filter((item) => item._id !== id)); // Update the state
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
    };

    // Handle Add New Item
    const handleAddNewItem = () => {
        setEditingItem(null); // Reset to "Add" mode
        setOpen(true); // Open the form
    };

    // Handle Edit Item
    const handleEditItem = (item: InventoryItem) => {
        setEditingItem(item); // Set the selected item for editing
        setOpen(true); // Open the form
    };

    return (
        <Box sx={{ margin: '20px' }}>
            {/* Inventory Overview */}
            <InventoryOverview inventory={inventory} />

            {/* Add New Item Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewItem}
                sx={{ marginBottom: '20px' }}
            >
                Add New Item
            </Button>

            {/* Inventory Table */}
            <InventoryTable
                inventory={inventory}
                handleDelete={handleDelete}
                handleEdit={handleEditItem} // Pass the edit handler
            />

            {/* Export Button */}
            <ExportButton inventory={inventory} />

            {/* Inventory Input Form */}
            <InventoryInputForm
                item={editingItem}
                fetchInventory={() => {}}
                setEditingItem={setEditingItem}
                open={open}
                setOpen={setOpen}
            />
        </Box>
    );
};

export default InventoryPage;
