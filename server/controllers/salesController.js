const Sales = require('../models/Sales');

// Add Sale
exports.addSale = async (req, res) => {
    try {
        const { unit, items, totalAmount } = req.body;
        // Validate the input data
        if (!unit || !items || !totalAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new sale record
        const sale = new Sales({
            unit,
            items,
            totalAmount,
        });

        // Save the sale record to the database
        await sale.save();
        res.status(201).json({ message: 'Sale added successfully', sale });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Sale
exports.deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        await Sales.findByIdAndDelete(id);
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
