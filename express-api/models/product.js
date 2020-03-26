const mongoose = require('mongoose');
const productCategorySchema = require('./product-category').Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Product = mongoose.model('Product', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        maxlength: 255
    },
    category: {
        type: productCategorySchema,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    }
}));

function validateProduct(product) {
    const schema = {
        name: Joi.string().required().min(5).max(255),
        categoryId: Joi.objectId().required(),
        price: Joi.number().min(0)
    }
    return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validateProduct = validateProduct;