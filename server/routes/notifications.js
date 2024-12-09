const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationsController');

const router = express.Router();

router.get('/', getNotifications);
router.put('/:id', markAsRead);

module.exports = router;
