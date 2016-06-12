var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Users Route - index'
  })
})

router.get('/signin', function(req, res, next) {
  res.render('users/signin', {
    title: 'Please sign in'
  })
})

router.post('/signin', function(req, res, next) {
  knex('users')
  .where({
    username: req.body.username.toLowerCase()
  })
  .first()
  .then(function(user) {
    if (!user) {
      res.send('signinerror');
    }
    // Check password
    if (req.body.password === user.password) {
      req.session.id = (Array.isArray(user.id)) ? user.id[0] : user.id
      res.redirect('/');
    }
    else {
      res.send('signinerror');
    }
  })
})

router.get('/signout', function(req, res, next) {
  res.clearCookie('session');
  res.redirect('/');
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {
    title: 'Sign up for a new account'
  })
})
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  knex('users')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
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
