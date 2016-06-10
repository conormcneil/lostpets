var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Pets Route - index'
  });
});

router.get('/lost', function(req, res, next) {
  res.render('index', {
    title: 'Pets Route - /pets/lost'
  });
});

router.get('/found', function(req, res, next) {
  res.render('index', {
    title: 'Pets Route - /pets/found'
  });
});

router.get('/all')

router.get('/add/lost')

router.get('/add/found')



module.exports = router;
