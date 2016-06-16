var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary');

// Function List
function capitalizeFirst(string) {
  console.log(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function phoneNumber(str){
  return str.split('-').join('').split(' ').join('').split('(').join('').split(')').join('');
}

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
      res.render('users/signin', {
        error: "Invalid username/password"
      });
    } else {
      // Check password
      if (bcrypt.compareSync(req.body.password,user.password)) {
        req.session.id = (Array.isArray(user.id)) ? user.id[0] : user.id
        res.locals.user = user;
        console.log("signin route: ", res.locals.user);
        res.redirect('/');
      }
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
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var $phone_number = phoneNumber(req.body.phone_number);
  console.log($phone_number);
  var password = bcrypt.hashSync(req.body.password,8);
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
        first_name: capitalizeFirst(req.body.first_name),
        last_name: capitalizeFirst(req.body.last_name),
        email: req.body.email,
        username: req.body.username,
        password: password,
        phone_number: $phone_number
      })
      .then(function(data){
        console.log(data);
        res.locals.id = data.id;
        res.locals.user = data;
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

router.get('/profile', function(req, res, next) {
  // console.log(res.locals.user);
  res.render('users/profile');
});

router.get('/profile/mypets', function(req, res, next) {
  knex('users').then(function(user) {
    knex('pets').fullOuterJoin('users', 'users.id', 'pets.user_id').where('users.id', res.locals.user.id).whereNot('pets.name', 'null').then(function(data) {
      var petsAndUser = data;
      console.log(petsAndUser);
      res.render('users/profilepets', { petsAndUser: petsAndUser, fs: { echo: capitalizeFirst }});
    });
  })
  .catch(function(err) {
    res.send(err);
  });
  // knex('pets').where('user_id', res.locals.user.id).then(function(pets) {
  //   var petsForUser = pets;
  //   console.log(pets);
  //   res.render('users/profilepets', { petsForUser: pets, fs: { echo: capitalizeFirst }});
  // })
  // .catch(function(err) {
  //   res.send(err);
  // });
});

module.exports = router;
