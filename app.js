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
    'd8b49edd1deddbeaf50cfee55306012158fa25db51940f82e677f0ab8352492dd9c167639169643c8bdfe898ac85ff04',
    'b8c68710eae90b2979d868d99f4f964f445c45805deeea5fad15672964b5c586a2ef162f5797fb039532beb43616576d',
    'daefa67d86c2581723f0269e83882045db0ca08aa2ba12f12634a527707ec233d2fbb94afd3321cea95013d99a5a7f13'
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
