const Joi = require('joi');
const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		minlength: 3,
		maxlength: 255
	}
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

function validateProductCategory(pc) {
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(pc, schema);
}

exports.ProductCategory = ProductCategory;
exports.validateProductCategory = validateProductCategory;
exports.Schema = productCategorySchema;