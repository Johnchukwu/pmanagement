const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    totalAmount: { type: Number, required: true },
    unit: { type: String, required: true },
    amount: Number,
    itemsSold: Number,
    category: String,
    transactionDate: Date,
});

const Sales = mongoose.models.Sales || mongoose.model('Sales', salesSchema);

module.exports = Sales;
