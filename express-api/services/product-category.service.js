const { ProductCategory, validateProductCategory } = require('../models/product-category');
const ObjectID = require('bson').ObjectID;

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

// CREATE 
async function createProductCategory(name) {
    const pc = new ProductCategory({ name });
    await pc.save();
    return pc;
}

// READ
async function getProductCategories() {
    return await ProductCategory.collection.aggregate(_productCountQuery).toArray();
}

async function getProductCategoryById(id) {

    const _pipelineQuery = [
        {
            '$match': {
                '_id': new ObjectID(id)
            }
        },
        ..._productCountQuery
    ];
    return await ProductCategory.collection.aggregate(_pipelineQuery).next();
}

// UPDATE
async function updateProductCategories(id, name) {
    return await ProductCategory.findByIdAndUpdate(id, { name }, { new: true });
}

// DELETE
async function deleteProductCategory(id) {
    return await ProductCategory.findByIdAndDelete(id);
}

// VALIDATE
function validate(productCategory) {
    return validateProductCategory(productCategory);
}

module.exports = {
    getProductCategories,
    getProductCategoryById,
    createProductCategory,
    updateProductCategories,
    deleteProductCategory,
    validate
}