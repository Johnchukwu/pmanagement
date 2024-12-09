const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { login } = require('../controllers/authController');
const { registerAdmin} = require('../controllers/authController');



router.post('/login', login);
router.post('/register', register);


router.post('/registeradmin', registerAdmin); 

module.exports = router;
