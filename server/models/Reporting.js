const mongoose = require('mongoose');

const ReportingSchema = new mongoose.Schema({
    unit: { type: String, required: true }, // e.g., "Restaurant", "Bookshop"
    reportType: { type: String, required: true }, // e.g., "Financial", "Inventory"
    data: { type: Object, required: true }, // Dynamic data based on the report type
    generatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reporting', ReportingSchema);
