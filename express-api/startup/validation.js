const Joi = require('joi');

// to validate dto objects or parameters in API
module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi);
}
