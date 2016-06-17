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
        res.redirect('/');
      }
      res.render('users/signin', {error: 'Username or password is incorrect.'});
    }
    // Check password
    if (req.body.password === user.password) {
      req.session.id = (Array.isArray(user.id)) ? user.id[0] : user.id
      res.locals.user = user;
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
  var $phone_number = phoneNumber(req.body.phone_number);
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
        res.locals.id = data.id;
        res.locals.user = data;
        res.redirect('/');
      })
      .catch(function(err) {
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
  res.render('users/profile');
});

router.get('/profile/mypets', function(req, res, next) {
  knex('pets').then(function(user) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('pets.user_id', res.locals.user.id).whereNot('pets.name', 'null').then(function(data) {
      var petsAndUser = data;
      res.render('users/profilepets', { petsAndUser: petsAndUser, fs: { echo: capitalizeFirst }});
    });
  })
  .catch(function(err) {
    res.send(err);
  });
});

router.get('/:id/profile', function(req, res, next){
  knex('pets')
  .where({
    id: req.params.id
  })
  .first()
  .then(function(pet){
    res.render('users/singlepet', {
      pet: pet,
    })
  })
})

router.get('/:id/profile/delete', function(req, res, next) {
  knex('pets')
  .where({id: req.params.id})
  .del()
  .then(function(data) {
    res.redirect('/users/profile/mypets');
  });
});

router.get('/:id/profile/update', function(req, res, next) {
  knex('pets').where({id: req.params.id}).then(function(data) {
    var pets = data;
    res.render('users/updatepet', {pets: pets});
  });
});

router.post('/:id/profile/update', function(req, res, next) {
  knex('pets').where({id: req.params.id}).update(req.body).then(function(){
    res.redirect('/users/profile/mypets')
  })
  .catch(function(err) {
    res.render('users/updatepet', {error: "Something went wrong, please try again."})
  });
});

router.get('/:id/profile/update/image', function(req, res, next) {
  knex('pets').where({id: req.params.id}).then(function(data) {
    var pets = data;
    res.render('users/imageupdate', {pets: pets});
  });
});

router.post('/:id/profile/update/image', function(req, res, next) {
  knex('pets')
  .where({
    id: req.params.id
  })
  .update({
    image: req.body.image
  })
  .then(function(){
    res.redirect('/users/profile/mypets')
  })
});

router.get('/account', function(req, res, next) {
  knex('users').where({id: res.locals.user.id}).first().then(function(data) {
    users = data
    res.render('users/account', {users: users});
  });
});

router.post('/account', function(req, res, next) {
  knex('users')
  .where({id: res.locals.user.id}).first()
  .update(req.body)
  .then(function(data) {
    res.redirect('/users/profile');
  })
  .catch(function(err) {
    res.render('users/account', {users: users, error: "There was an error, please try again."});
  });
});

router.get('/account/password', function(req, res, next) {
  res.render('users/password');
});

router.post('/account/password', function(req, res, next) {
  knex('users').where({id: res.locals.user.id}).first()
  .then(function(data) {
    if(bcrypt.compareSync(req.body.password,data.password)) {
      req.session.id = data.id;
      res.redirect('/users/account/password/change');
    }
    else {
      res.render('users/password', {error: "That password is incorrect"});
    }
  });
});

router.get('/account/password/change', function(req, res, next) {
  res.render('users/passwordchange');
});

router.post('/account/password/change', function(req, res, next) {
  if(!req.body.password || !req.body.password2) {
    res.render('users/passwordchange', {error: "Please enter a password in both fields"});
  }
  else if(req.body.password === req.body.password2) {
    var password = bcrypt.hashSync(req.body.password,8);
    knex('users').where({id: res.locals.user.id}).first().then(function(data) {
      knex('users').update({password: password}).then(function(data) {
        res.redirect(res.redirect('/users/profile'));
      })
    })
  }
  else {
    res.render('users/passwordchange', {error: "There was an error, please try again"});
  }
});

module.exports = router;
