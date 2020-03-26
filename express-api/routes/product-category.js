const express = require('express');
const router = express.Router();
const { ProductCategory, validateProductCategory } = require('../models/product-category');
const ObjectID = require('bson').ObjectID;

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

const _productCountQuery = [
	{
		'$lookup': {
			'from': 'products',
			'let': {
				'categoryId': '$_id'
			},
			'pipeline': [
				{
					'$match': {
						'$expr': {
							'$eq': [
								'$category._id', '$$categoryId'
							]
						}
					}
				}
			],
			'as': 'products'
		}
	}, {
		'$project': {
			'name': 1,
			'totalProducts': {
				'$size': '$products'
			}
		}
	}
];

router.get('/:id', async (req, res) => {

	const _pipelineQuery = [
		{
			'$match': {
				'_id': new ObjectID(req.params.id)
			}
		},
		..._productCountQuery
	];
	const pc = await ProductCategory.collection.aggregate(_pipelineQuery).next();

	pc ? res.json(pc) : res.status(404).send('product-category not found')
});

router.get('/', async (req, res, next) => {

	const pcs = await ProductCategory.collection.aggregate(_productCountQuery).toArray();
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