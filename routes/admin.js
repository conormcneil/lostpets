var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// Include functions from /routes/lib/users.js
var admin = require('./lib/admin.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Admin Route'
  });
});

// Display list of users from DB at /admin/users
router.get('/users', function(req, res, next) {
  knex('users')
  .orderBy('id','asc')
  .then(function(users) {
    if(res.locals.user == undefined) {
      res.render('users/error');
    }
    else if(res.locals.user.isAdmin) {
      res.render('users/userlist', {
        users: users
      });
    }
    else {
      res.render('users/error');
    }
  });
});
// Display list of pets from DB at /admin/pets
router.get('/pets', function(req, res, next) {
  knex('pets')
  .orderBy('id','asc')
  .then(function(pets) {
    res.render('pets/petlist', {
      pets: pets
    });
  });
});
router.get('/:id/profile/delete', function(req, res, next){
  knex('pets')
  .where({id: req.params.id})
  .del()
  .then(function(data) {
    res.redirect('/admin/pets');
  });
})

router.get('/users/:id/:isAdmin', function(req, res, next){
  knex('users')
  .where({
    id: req.params.id
  })
  .update({
    isAdmin: req.params.isAdmin
  })
  .then(function(users) {
    res.redirect('/admin/users');
  })
})

module.exports = router;
