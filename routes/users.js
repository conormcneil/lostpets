var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Users Route - index'
  });
});

router.get('/signin', function(req, res, next) {
  res.render('index', {
    title: 'Users Route - /users/signin'
  });
});

router.get('/signup', function(req, res, next) {
  res.render('index', {
    title: 'Users Route - /users/signup'
  });
});

module.exports = router;
