const Notifications = require('../models/Notifications');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notifications.findByIdAndUpdate(id, { read: true }, { new: true });
        res.json({ message: 'Notification marked as read', notification });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
