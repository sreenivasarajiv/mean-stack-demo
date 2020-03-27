const router = require('express').Router();
const ProductsCtrl = require('../controllers/product.controller');

module.exports = router.post('/', ProductsCtrl.createProduct)
    .get('/', ProductsCtrl.getProducts)
    .get('/:id', ProductsCtrl.getProductById)
    .put('/:id', ProductsCtrl.updateProduct)
    .put('/:id', ProductsCtrl.deleteProduct)
