const mongoose = require('mongoose');

const MailLogSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' },
    attempts: { type: Number, default: 1 },
    error: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MailLog', MailLogSchema);
