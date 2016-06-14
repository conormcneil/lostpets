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
<<<<<<< HEAD
      res.send('signinerror');
    } else {
      // Check password
      if (req.body.password === user.password) {
        req.session.id = (Array.isArray(user.id)) ? user.id[0] : user.id
        res.locals.user = user;
        console.log("signin route: ", res.locals.user);
        res.redirect('/');
      }
      else {
        res.send('signinerror');
      }
=======
      res.render('users/signin', {error: 'Username or password is incorrect.'});
    }
    // Check password
    if (req.body.password === user.password) {
      req.session.id = (Array.isArray(user.id)) ? user.id[0] : user.id
      console.log("USER: ", user);
      res.locals.user = user;
      console.log("RES.LOCALS", res.locals);
      res.redirect('/');
    }
    else {
      res.render('users/signin', {error: 'Username or password is incorrect.'});
>>>>>>> 9b0e3c2ca8e23093a562a0f860f59847fe8f919b
    }
  });
});

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
  // Check if username exists in database
  knex('users')
  .where({
    username: req.body.username.toLowerCase()
  })
  .first()
  .then(function(data){
    if(!data){
      knex('users')
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
      .then(function(data){
        console.log(data);
        res.locals.id = data.id;
        console.log(res.locals.id);
        res.redirect('/');
      })
      .catch(function(err) {
        console.log(req.body);
        res.render('users/signup', {
          title: 'Sign up for a new account',
          error: 'Something went wrong: please try again.'
        })
      })
    } else {
      res.render('users/signup', {
        title: 'Sign up for a new account',
        error: 'Something went wrong: please try again.'
      })
    }
  })
})

module.exports = router;
