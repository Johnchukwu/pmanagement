export interface Sale {
    transactionDate: string | number | Date;
    _id: string;
    date: string;
    amount: number;
    itemsSold: number;
    category: string;
    totalAmount: number;
    totalSales: number; 
    unit: string;
    items: Array<{
        itemName: string;
        quantity: number;
        unitPrice: number;
        total: number;
    }>;
}
