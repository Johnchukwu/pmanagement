const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    recipient: { type: String, required: true }, // e.g., "Manager", "Headquarters"
    type: { type: String, enum: ['LowStock', 'Reorder', 'Feedback'], required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notifications', NotificationSchema);
