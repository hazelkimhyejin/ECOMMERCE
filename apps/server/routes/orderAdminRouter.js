const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/admin/:id', orderController.getOrderByIdAdmin)
router.get('/product/:id', orderController.getOrdersByProductId)

module.exports = router