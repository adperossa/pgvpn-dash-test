require('dotenv').config();

// MODULE IMPORTS
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expSession = require('express-session');
const cors = require('cors');
require('express-async-errors');

//const db = require('./config/database');
//const logger = require('./config/logger');
const hbs = require('./config/expressHandlebars');
const webRouter = require('./routers/webRouter');

// INIT CONFIG AND INITIALIZATION ---------------

const app = express();

// Handlebars
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);


// END CONFIG -----------------------------------


// MIDDLEWARES ----------------------------------

// Static assets --------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// Standard forms
app.use(bodyParser.urlencoded({ extended: true }));

// JSON requests
app.use(bodyParser.json());

// CORS enabler
app.use(cors());

// Session Mgr
app.use(expSession({
  secret: 'Random Encryption',
  resave: false,
  saveUninitialized: false
}));

// Handle global data for all requests
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.loggedUser;
  next();
});

// END MIDDLEWARES ------------------------------


// ROUTES ---------------------------------------

app.use('/', webRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let error = new Error('Not Found: ' + fullUrl);
  error.status = 404;
  next(error);

});

// END ROUTES -----------------------------------

// Error handler
app.use(function (err, req, res, next) {

  console.log("ERROR: ", err.message);
  //logger.error('ERROR: ', err);

  res.status(err.status || 500);
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  if (req.header('accept') && req.header('accept').includes('application/json')) {

    res.json({
      success: false,
      status: res.status,
      message: err.message,
      result: null,
      req: {
        url: fullUrl,
        method: req.method,
        headers: req.headers,
        body: req.body
      }
    });

  } else {

    // render the error pages
    if (err.status === 404) {
      res.render('pages/404.handlebars', {
        layout: false
      });
    } else {
      res.render('pages/500.handlebars', {
        layout: false
      });
    }

  }

});


// Start server
let server = app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
  console.log(`Server started on port ${server.address().port}`);
  // db.authenticate()
  //   .then(() => console.log('Database connected succesfully'))
  //   .catch(err => console.log("Error initializing DB: " + err));
});