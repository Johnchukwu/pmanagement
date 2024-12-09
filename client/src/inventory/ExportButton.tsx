import React from 'react';
import { Button } from '@mui/material';
import { InventoryItem } from '../types/inventory';
import { utils, writeFile } from 'xlsx';

interface ExportButtonProps {
    inventory: InventoryItem[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ inventory }) => {
    const handleExport = () => {
        const formattedData = inventory.map((item) => ({
            ItemName: item.itemName,
            Category: item.category,
            Quantity: item.quantity,
            UnitPrice: item.unitPrice.toFixed(2),
            TotalValue: (item.quantity * item.unitPrice).toFixed(2),
        }));

        const worksheet = utils.json_to_sheet(formattedData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Inventory');
        writeFile(workbook, 'InventoryData.xlsx');
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleExport}>
            Export as Excel
        </Button>
    );
};

export default ExportButton;
