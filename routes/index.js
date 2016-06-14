var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lost Pets!'
  });
});
router.get('/error', function(req, res, next) {
  res.render('index', {
    title: 'error; something went wrong with Auth0'
  });
});

module.exports = router;
