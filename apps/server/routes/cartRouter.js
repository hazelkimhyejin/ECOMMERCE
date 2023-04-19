const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart)
router.get('/user/:id', cartController.getCartByUserId)
router.get('/user/count/:id', cartController.countCartByUserId)
router.patch('/', cartController.updateCart)
router.delete('/:id', cartController.deleteFromCart)
router.delete('/user/:id', cartController.removeAllFromCart)

module.exports = router