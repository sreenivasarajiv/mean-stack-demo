const express = require('express');
require('express-async-errors');

const productCategory = require('../routes/product-category.route');
const product = require('../routes/product.route');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { errorHandler } = require('../middlewares/error');

module.exports = function (app) {

    app.use(express.json());

    app.use('/api/product-category', productCategory);
    app.use('/api/product', product);

    // docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // global error handler
    app.use(errorHandler);

}