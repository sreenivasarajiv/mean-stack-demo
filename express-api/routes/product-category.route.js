const express = require('express');
const router = express.Router();
const ProductCategoryCtrl = require('../controllers/product-category.controller');

module.exports = router.post('/', ProductCategoryCtrl.createProductCategory)
	.get('/', ProductCategoryCtrl.getProductCategories)
	.get('/:id', ProductCategoryCtrl.getProductCategoryById)
	.put('/:id', ProductCategoryCtrl.updateProductCategories)
	.delete('/:id', ProductCategoryCtrl.deleteProductCategory);