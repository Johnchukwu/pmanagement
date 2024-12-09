const express = require('express');
const { getReorders, completeReorder } = require('../controllers/reorderController');

const router = express.Router();

router.get('/', getReorders);
router.put('/:id', completeReorder);

module.exports = router;
