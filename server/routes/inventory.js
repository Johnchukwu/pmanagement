const express = require('express');
const { addItem, getItems, updateItem, deleteItem } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/', addItem);
router.get('/', getItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
