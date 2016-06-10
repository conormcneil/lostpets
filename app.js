require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieSession = require('cookie-session');
var knex = require('./db/knex');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var pets = require('./routes/pets');

var app = express();

// Enable cookie-session
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSION_KEY1,
    process.env.SESSION_KEY2,
    process.env.SESSION_KEY3
  ]
}));

// Check if user is signed in before every route
app.use(function(req, res, next) {
  req.session.id = (Array.isArray(req.session.id)) ? req.session.id[0] : req.session.id
  if (req.session.id) {
    knex('users')
    .where({
      id: req.session.id
    })
    .first()
    .then(function(data) {
      res.locals.user = data;
      next();
    })
  } else {
    res.locals.user = {
      username: 'Guest'
    }
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/pets', pets);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
