const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.handleNewUser)
router.post('/login', userController.handleLogin)
router.post('/update', userController.handleUpdateUser)
router.post('/updatepw', userController.handleUpdatePassword)
router.get('/refresh', userController.handleRefreshToken)
router.get('/logout', userController.handleLogout)
router.post('/forgot', userController.handleForgotPassword)
router.post('/verifyotp', userController.handleOTPVerification)

module.exports = router