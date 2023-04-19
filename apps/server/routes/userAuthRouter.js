const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/resetpw', userController.handleResetPassword)

module.exports = router