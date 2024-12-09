const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    unit: { type: String, required: true }, // e.g., "Restaurant", "Bookshop"
    expenseType: { type: String, required: true }, // e.g., "Utility", "Maintenance"
    amount: { type: Number, required: true },
    expenseDate: { type: Date, default: Date.now },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
