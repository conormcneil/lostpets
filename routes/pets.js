var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var cloudinary = require('cloudinary');

function capitalizeFirst(string) {
    console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').whereNot('pets.name', 'null').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/all', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }});
    });
  })
  .catch(function(err) {
    res.send(err);
  });
});

router.get('/browselost', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'false').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/browselost', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }});
    });
  });
});

router.get('/browsefound', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'true').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/browsefound', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }});
    });
  });
});

router.get('/add/lost', function(req, res, next) {
  res.render('pets/reportlost', {});
});

router.post('/add/lost', function(req, res, next) {
  if(req.body.species === 'other') {
    knex('pets').insert({
      name: req.body.name,
      species: req.body.other,
      location: req.body.location,
      age: req.body.age,
      description: req.body.description,
      user_id: req.session.id,
      image: req.body.image,
      contact: req.body.contact,
      date: req.body.date,
      isFound: 'false'
    })
    .then(function(data) {
      res.redirect('/lost/:id/addimage');
    })
    .catch(function(err) {
      console.log(err);
      res.render('pets/reportfound', { error: "Something went wrong in submitting your form. Please try again." })
    });
  } else {
    knex('pets').insert({
      name: req.body.name,
      species: req.body.species,
      location: req.body.location,
      age: req.body.age,
      description: req.body.description,
      user_id: req.session.id,
      contact: req.body.contact,
      date: req.body.date,
      isFound: 'false'
    })
    .returning('id')
    .then(function(id) {
      console.log("ID: ", id);
      res.redirect('/pets/add/lost/' + id + '/addimage');
    })
    .catch(function(err) {
      console.log(err);
      res.render('pets/reportlost', { error: "Something went wrong in submitting your form. Please try again." })
    });
  }
});
router.post('/add/lost/addimage', function(req, res, next){
  console.log(req.body);
  knex('pets')
  .where({
    id: req.body.idInput
  })
  .update({
    image: req.body.image
  })
  .then(function(){
    res.send('success!');
  })
})
router.get('/add/lost/:id/addimage', function(req, res, next){
  console.log("GET: ", req.params.id);
  knex('pets')
  .where({
    id: req.params.id
  })
  .returning('id')
  .then(function(id){
    // window.localStorage.setItem('petId', id);
    res.locals.petId = id;
    console.log(res.locals.petId);
    res.render('pets/imageupload');
  });
});
router.post('/add/lost/:id/addimage', function(req, res, next){
  // console.log("POST: ", req.body.id);
  // console.log("POST: " + req.body);
  knex('pets')
  .where({
    id: req.params.id
  })
  .insert({
    image: req.body.image
  })
  .then(function(){
    res.render('success-lost', {})
  })
});

router.get('/add/pets/success-lost', function(req, res, next) {
  res.render('pets/success-lost');
});

router.get('/add/found', function(req, res, next) {
  res.render('pets/reportfound');
});

router.post('/add/found', function(req, res, next) {
  if(req.body.species === 'other') {
    knex('pets').insert(
        {
          name: req.body.name,
          species: req.body.other,
          location: req.body.location,
          age: req.body.age,
          description: req.body.description,
          user_id: req.session.id,
          image: req.body.image,
          contact: req.body.contact,
          date: req.body.date,
          isFound: 'true'
        })
        .then(function(data) {
          res.redirect('pets/success-found');
        })
        .catch(function(err) {
          res.send(err);
          res.render('pets/reportfound', { error: "Something went wrong in submitting your form. Please try again." })
        });
  }
    else {
      knex('pets').insert(
          {
            name: req.body.name,
            species: req.body.species,
            location: req.body.location,
            age: req.body.age,
            description: req.body.description,
            user_id: req.session.id,
            image: req.body.image,
            contact: req.body.contact,
            date: req.body.date,
            isFound: 'true'
          })
          .then(function(data) {
            res.redirect('pets/success-found');
          })
          .catch(function(err) {
            res.send(err);
            res.render('pets/reportfound', { error: "Something went wrong in submitting your form. Please try again." })
          });
    }
});

router.get('/add/pets/success-found', function(req, res, next) {
  res.render('pets/success-found');
});



module.exports = router;
