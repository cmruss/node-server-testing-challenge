const express = require('express');
const router = require('./router');

const server = express();
const middleware = require('./middleware');

middleware(server);

server.use('/api', router)

module.exports = server;