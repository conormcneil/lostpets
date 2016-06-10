var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// Include functions from /routes/lib/users.js
var admin = require('./lib/admin.js');


// Authorize User as Admin
// router.use(admin.userIsAuth);

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
    res.render('users/userlist', {
      users: users
    })
  })
})

module.exports = router;
