const Inventory = require('../models/Inventory');
const Reorder = require('../models/Reorder');
const Notifications = require('../models/Notifications');
const sendMail = require('../config/mailer');
const loadTemplate = require('../utils/templateLoader');


exports.addItem = async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).json({ message: 'Item added successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });

        if (updatedItem.quantity < updatedItem.threshold) {
            const emailTemplate = loadTemplate('lowStockAlert', {
                itemName: updatedItem.itemName,
                unit: updatedItem.unit,
            });

            await sendMail({
                to: 'manager-email@example.com',
                subject: `Low Stock Alert: ${updatedItem.itemName}`,
                html: emailTemplate,
            });

            res.json({ message: 'Item updated and low-stock alert sent', updatedItem });
        } else {
            res.json({ message: 'Item updated successfully', updatedItem });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Inventory.findByIdAndDelete(id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
