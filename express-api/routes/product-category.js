const express = require('express');
const router = express.Router();
const { ProductCategory, validateProductCategory } = require('../models/product-category');

// CREATE

router.post('/', async (req, res) => {

	const { value, error } = validateProductCategory(req.body);

	if (error)
		return res.status(400).send(error.details[0].message);

	let pc = new ProductCategory({ name: value.name });
	pc = await pc.save();
	res.json(pc);
	2
});

// READ

router.get('/:id', async (req, res) => {
	const pc = await ProductCategory.findOne({ _id: req.params.id });
	pc ? res.json(pc) : res.status(404).send('product-category not found')
});

router.get('/', async (req, res, next) => {
	const pcs = await ProductCategory.find().sort({ name: 1 });
	res.json(pcs);
});


// UPDATE

router.put('/:id', async (req, res) => {

	const { value, error } = validateProductCategory(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	const pc = await ProductCategory.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
	if (!pc)
		return res.status(404).send('product-category not found');

	res.json(pc);

});

// DELETE

router.delete('/:id', async (req, res) => {

	let pc = await ProductCategory.findByIdAndDelete(req.params.id);
	if (!pc)
		return res.status(404).send('product-category not found');

	res.json(pc);
});

module.exports = router;