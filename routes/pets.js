var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pets/pets', {
    title: 'Pets Route - index'
  });
});

router.get('/lost', function(req, res, next) {
  res.render('pets/lost', {
    title: 'Pets Route - /pets/lost'
  });
});

router.get('/found', function(req, res, next) {
  res.render('pets/found', {
    title: 'Pets Route - /pets/found'
  });
});

router.get('/all', function(req, res, next) {
  res.render('pets/all');
});

router.get('/add/lost', function(req, res, next) {
  res.render('pets/reportlost');
});

router.post('/add-lost-pet', function(req, res, next) {
  // knex('pets').insert(req.)
})

router.get('/add/found', function(req, res, next) {
  res.render('pets/reportfound');
});



module.exports = router;
