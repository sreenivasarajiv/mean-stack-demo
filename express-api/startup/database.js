const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
const connString = config.get('CONNECTION_STRING');

module.exports = function () {
    mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => winston.info('connected to mongodb ...'))
}