const express = require('express');
const { addSale, getSales, deleteSale } = require('../controllers/salesController');

const router = express.Router();

router.post('/', addSale);
router.get('/', getSales);
router.delete('/:id', deleteSale);

module.exports = router;
