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
    console.log("REQ.SESSION IS: ", res.locals.user);
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

module.exports = router;
