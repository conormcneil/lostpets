var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Users Route - index'
  });
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin', {
    title: 'Please sign in'
  });
});
router.post('/signin', function(req, res, next) {
  knex('users')
  .first()
  .where({
    username: req.body.username
  })
  .then(function(user){
    if (req.body.password === user.password) {
      res.render('users/signin', {
        title: 'Please sign in',
        error: 'Sign in Success'
      });
    } else {
      res.render('users/signin', {
        title: 'Please sign in',
        error: 'Invalid username or password'
      });
    }
  })
  .catch(function(err){
    res.render('users/signin', {
      title: 'Please sign in',
      error: 'Invalid username or password'
    });
  })
})

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {
    title: 'Sign up for a new account'
  });
});
router.post('/signup', function(req, res, next) {
  knex('users')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.userame,
    password: req.body.password
  })
  .then(function(data){
    res.render('users/userlist', {
      title: 'User added successfully'
    })
  })
  .catch(function(err) {
    console.log(req.body);
    res.render('users/signup', {
      title: 'Sign up for a new account',
      error: 'Something went wrong: please try again.'
    })
  })
})

module.exports = router;
