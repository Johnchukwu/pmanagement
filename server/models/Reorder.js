const mongoose = require('mongoose');

const ReorderSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantityToOrder: { type: Number, required: true },
    unit: { type: String, required: true }, // e.g., "Restaurant", "Bookshop"
    reorderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Reorder', ReorderSchema);
