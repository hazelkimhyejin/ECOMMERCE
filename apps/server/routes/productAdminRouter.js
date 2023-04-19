const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addNewProduct);
router.put('/', productController.updateProductById);
router.put('/list/:id', productController.updateProductListingById);

module.exports = router