const router = require('express').Router();
const { Product, validateProduct } = require('../models/product');
const { ProductCategory } = require('../models/product-category');

// CREATE

router.post('/', async (req, res) => {
    const { error, value } = validateProduct(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const category = await ProductCategory.findById(value.categoryId);

    if (!category)
        return res.status(404).send('category not found');

    value.category = {
        _id: category._id,
        name: category.name
    };

    const product = new Product(value);
    await product.save();

    res.send(product);
});

// READ 

router.get('/', async (req, res) => {
    const product = await Product.find();
    res.send(product);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
});

// UPDATE

router.put('/:id', async (req, res) => {
    const { error, value } = validateProduct(req.body, true);

    if (error)
        return res.status(400).send(error.details[0].message);

    if (value.category) {
        const category = await ProductCategory.findById(value.category._id);

        if (!category)
            return res.status(404).send('product category not found');

        value.category = {
            _id: category._id,
            name: category.name
        };

    }

    const product = await Product.findOneAndUpdate({ _id: req.params.id }, value, { new: true });

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
});

router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
        return res.status(404).send('product not found');

    res.send(product);
});


module.exports = router;