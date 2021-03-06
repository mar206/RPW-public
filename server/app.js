/*
ROLE PLAYING WORDS (RPW) API
This is the API to support the RPW app.
*/

//Module imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

//Internal imports
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const storyRoutes = require('./routes/stories');

//Services
const SegmentUpdate = require('./services/SegmentUpdate');

//Setup variables
//Checks if using production or development environment
const PROD_ENV = (process.env.PORT !== undefined);
const PORT = process.env.PORT || 8080;
//Sets the name of root directory
const ROOT_DIR = __dirname.replace('server', '');

//Setup
//If production env - use the build folder on client
if (PROD_ENV) app.use(express.static(ROOT_DIR + 'client/build'));
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/stories', storyRoutes);

//Send React's index.html
if (PROD_ENV) {
  app.get('/', (req, res) => {
    res.sendFile(ROOT_DIR + 'client/build/index.html');
  });
}

//Error handling
//Create a new error and pass it to the next middleware
//This will be reached if none of the app's routes was reached
app.use(function(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Send to errorHandler
app.use(errorHandler);

//Listening
app.listen(PORT, function() {
  console.log('API server has started on PORT: ', PORT);
});
