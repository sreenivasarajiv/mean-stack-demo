const winston = require('winston');

module.exports = function (err, req, res, next) {
    // handles global errors

    // log the error
    winston.error(err.message, err)

    // send message to client
    res.status(500).send('something went wrong. contact support');

}