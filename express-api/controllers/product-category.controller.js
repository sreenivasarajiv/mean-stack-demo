const ProductCategoryService = require('../services/product-category.service');

// CREATE 
async function createProductCategory(req, res) {

    const { value, error } = ProductCategoryService.validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const pc = await ProductCategoryService.createProductCategory(value.name);
    return res.json(pc);
}

// READ
async function getProductCategories(req, res, next) {

    const pcs = await ProductCategoryService.getProductCategories();
    return res.json(pcs);
}

async function getProductCategoryById(req, res) {

    const pc = await ProductCategoryService.getProductCategoryById(req.params.id);

    return pc ? res.json(pc) : res.status(404).send('product-category not found')
}

// UPDATE
async function updateProductCategories(req, res) {

    const { value, error } = ProductCategoryService.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const pc = await ProductCategoryService.updateProductCategories(req.params.id, value.name);
    if (!pc)
        return res.status(404).send('product-category not found');

    return res.json(pc);
}

// DELETE
async function deleteProductCategory(req, res) {

    let pc = await ProductCategoryService.deleteProductCategory(req.params.id);
    if (!pc)
        return res.status(404).send('product-category not found');

    return res.json(pc);
}

module.exports = {
    createProductCategory,
    getProductCategories,
    getProductCategoryById,
    updateProductCategories,
    deleteProductCategory
}