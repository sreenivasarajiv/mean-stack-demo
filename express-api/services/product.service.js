const { Product, validateProduct } = require('../models/product');

// CREATE
async function createProduct(product) {
    const _product = new Product(product);
    return await _product.save();
}

// READ 
async function getProducts(req, res) {
    return await Product.find();
}

async function getProductById(_id) {
    return await Product.findOne({ _id });
}

// UPDATE
async function updateProduct(_id, product) {
    return await Product.findOneAndUpdate({ _id }, product, { new: true });
}

// DELETE
async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}

function validate(product) {
    return validateProduct(product);
}


module.exports = { createProduct, getProductById, getProducts, updateProduct, deleteProduct, validate };