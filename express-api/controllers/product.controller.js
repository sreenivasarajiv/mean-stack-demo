const ProductCategoryService = require('../services/product-category.service');
const ProductService = require('../services/product.service');

// CREATE
async function createProduct(req, res) {
    const { error, value } = ProductService.validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const category = await ProductCategoryService.getProductCategoryById(value.categoryId);

    if (!category)
        return res.status(404).send('category not found');

    value.category = {
        _id: category._id,
        name: category.name
    };

    const product = await ProductService.createProduct(value)
    res.send(product);
}

// READ 
async function getProducts(req, res) {
    const product = await ProductService.getProducts();
    res.send(product);
}

async function getProductById(req, res) {
    const product = await ProductService.getProductById(req.params.id);

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
}

// UPDATE
async function updateProduct(req, res) {
    const { error, value } = ProductService.validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    if (value.category) {
        const category = await ProductCategoryService.getProductCategoryById(value.category._id);

        if (!category)
            return res.status(404).send('product category not found');

        value.category = {
            _id: category._id,
            name: category.name
        };

    }

    const product = await ProductService.updateProduct(req.params.id, value);

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
}

// DELETE
async function deleteProduct(req, res) {

    const product = await ProductService.deleteProduct(req.params.id);

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
}

module.exports = { createProduct, getProductById, getProducts, updateProduct, deleteProduct };