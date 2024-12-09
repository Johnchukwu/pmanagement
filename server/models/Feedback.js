const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    unit: { type: String, required: true }, // e.g., "Restaurant", "Bookshop"
    customerName: { type: String, required: true },
    comments: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // 1 to 5 scale
    feedbackDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
