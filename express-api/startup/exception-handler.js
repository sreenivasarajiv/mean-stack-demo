const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const connString = config.get('CONNECTION_STRING');

module.exports = function () {

    // global logging
    winston.add(new winston.transports.File({ filename: 'debug.log' }));
    winston.add(new winston.transports.MongoDB({ db: connString }));
    winston.add(new winston.transports.Console({ format: winston.format.simple() }));

    // global exception handling
    winston.exceptions.handle([
        new winston.transports.File({ filename: 'unhandledExceptions.log' }),
        new winston.transports.MongoDB({ db: connString }),
        new winston.transports.Console({ colorize: true, prettyPrint: true })
    ]);

}