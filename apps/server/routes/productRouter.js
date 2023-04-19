const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/cat/:id', productController.getProductByCategory);
router.get('/:id', productController.getProductById);
router.get('/cat/count/:id', productController.countProductByCategory);

module.exports = router