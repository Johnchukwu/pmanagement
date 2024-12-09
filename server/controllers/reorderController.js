const Reorder = require('../models/Reorder');

exports.getReorders = async (req, res) => {
    try {
        const reorders = await Reorder.find();
        res.json(reorders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.completeReorder = async (req, res) => {
    try {
        const { id } = req.params;
        const reorder = await Reorder.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });
        res.json({ message: 'Reorder completed', reorder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
