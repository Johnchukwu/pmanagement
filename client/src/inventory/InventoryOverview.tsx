import React from 'react';
import { InventoryItem } from '../types/inventory';

interface InventoryOverviewProps {
    inventory: InventoryItem[];
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ inventory }) => {
    return (
        <div>
            {inventory.map(item => (
                <div key={item._id}>{item.itemName}</div>
            ))}
        </div>
    );
};

export default InventoryOverview;
