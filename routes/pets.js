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
  knex('pets').then(function(pets) {
    console.log(pets);
    // for(var i=0; i<pets.length; i++) {
    //   console.log(pets[i]['name']);
    //   console.log(pets[i]['name'].charAt(0).toUpperCase() + pets[i]['name'].slice(1));
    // }
    function capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    res.render('pets/all', { pets: pets, fs: { echo: capitalizeFirst }});
  });
});

router.get('/browselost', function(req, res, next) {
  knex('pets').where('isFound', 'false').then(function(pets) {
    console.log(pets);
    function capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    res.render('pets/browselost', { pets: pets, fs: { echo: capitalizeFirst }});
  });
});

router.get('/browsefound', function(req, res, next) {
  knex('pets').where('isFound', 'true').then(function(pets) {
    console.log(pets);
    function capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    res.render('pets/browsefound', { pets: pets, fs: { echo: capitalizeFirst }});
  });
});

router.get('/add/lost', function(req, res, next) {
  console.log(req.session.id);
  res.render('pets/reportlost');
});

router.post('/add/lost', function(req, res, next) {
  console.log(req.body);
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
    }
  )
  .then(function(data) {
    res.redirect('pets/success');
  })
  .catch(function(err) {
    console.log(err);
    res.render('pets/reportlost', { error: "Something went wrong in submitting your form. Please try again" })
  });
});

router.get('/add/found', function(req, res, next) {
  res.render('pets/reportfound');
});



module.exports = router;
