// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test-mean-app');


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// use it before all route definitions
app.use(cors({origin:  'http://localhost:4200'}));

// Set our api routes
app.use('/api', require('./server/routes/api'));
app.use('/api', require('./server/routes/bears'));
app.use('/api', require('./server/routes/posts'));


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
