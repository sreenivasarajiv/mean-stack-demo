const logger = (req, res, next) => {
	console.log('http request: ' + req.originalUrl);
	next();
}

module.exports = logger;