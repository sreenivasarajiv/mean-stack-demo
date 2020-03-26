const express = require('express');
const app = express();
const winston = require('winston');
const config = require('config'); 

const port = process.env.PORT || config.get('PORT');

require('./startup/validation')();
require('./startup/exception-handler')();
require('./startup/config')();
require('./startup/database')();
require('./startup/routes')(app);

app.listen(port, () => winston.info(`Listening to port: ${port}`));