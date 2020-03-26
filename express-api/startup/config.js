const config = require('config');

module.exports = function () {
    if (!config.get('CONNECTION_STRING')) {
        throw new Error('FATAL ERROR: CONNECTION_STRING is not defined');
    }
}