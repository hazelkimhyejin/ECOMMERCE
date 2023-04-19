const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.addNewOrder)
router.put('/', orderController.updateOrder)
router.get('/user/:id', orderController.getOrdersByUserId)
router.get('/:id', orderController.getOrderById)

module.exports = router