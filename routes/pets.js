var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var cloudinary = require('cloudinary');

function capitalizeFirst(string) {
    console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function phoneNumber(str){
  return str.split('-').join('').split(' ').join('').split('(').join('').split(')').join('');
}

function shortenDate(date) {
  if(typeof date === 'string') {
    return date;
  }
  // else {
  //   var dateString = JSON.stringify(date);
  //   var monthDay = dateString.substr(6, 5);
  //   var year = dateString.substr(1, 4);
  //   var newDateString = year + '-' + monthDay;
  //   return newDateString;
  // }
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
      res.render('pets/all', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  })
  .catch(function(err) {
    res.send(err);
  });
});

router.get('/all/dogs', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').whereNot('pets.name', 'null').where('pets.species', 'dog').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/all', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/all/cats', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').whereNot('pets.name', 'null').where('pets.species', 'cat').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/all', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/all/other', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').whereNot('pets.name', 'null').whereNot('pets.species', 'dog').whereNot('pets.species', 'cat').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/all', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browselost', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'false').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/browselost', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browselost/dogs', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'false').where('pets.species', 'dog').then(function(data) {
      var petsAndUsers = data;
      console.log(petsAndUsers);
      res.render('pets/browselost', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browselost/cats', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'false').where('pets.species', 'cat').then(function(data) {
      var petsAndUsers = data;
      console.log(petsAndUsers);
      res.render('pets/browselost', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browselost/other', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'false').whereNot('pets.species', 'dog').whereNot('pets.species', 'cat').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/browselost', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browsefound', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'true').then(function(data) {
      var petsAndUsers = data;
      res.render('pets/browsefound', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browsefound/dogs', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'true').where('pets.species', 'dog').then(function(data) {
      var petsAndUsers = data;
      console.log(petsAndUsers);
      res.render('pets/browsefound', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browsefound/cats', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'true').where('pets.species', 'cat').then(function(data) {
      var petsAndUsers = data;
      console.log(petsAndUsers);
      res.render('pets/browsefound', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/browsefound/other', function(req, res, next) {
  knex('pets').then(function(pets) {
    knex('users').fullOuterJoin('pets', 'pets.user_id', 'users.id').where('isFound', 'true').whereNot('pets.species', 'cat').whereNot('pets.species', 'dog').then(function(data) {
      var petsAndUsers = data;
      console.log(petsAndUsers);
      res.render('pets/browsefound', { petsAndUsers: petsAndUsers, fs: { echo: capitalizeFirst }, func: { call: shortenDate }});
    });
  });
});

router.get('/add/lost', function(req, res, next) {
  if(req.session.id) {
    res.render('pets/reportlost', {});
  }
  else {
    res.render('pets/error');
  }
});

router.post('/add/lost', function(req, res, next) {
  var date = JSON.stringify(req.body.date);
  console.log(date);
  var $phone_number = phoneNumber(req.body.contact);
  if(req.body.species === 'other') {
    knex('pets').insert({
      name: req.body.name,
      species: req.body.other,
      location: req.body.location,
      age: req.body.age,
      description: req.body.description,
      user_id: req.session.id,
      contact: $phone_number,
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
  } else {
    knex('pets').insert({
      name: req.body.name,
      species: req.body.species,
      location: req.body.location,
      age: req.body.age,
      description: req.body.description,
      user_id: req.session.id,
      contact: $phone_number,
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
  knex('pets')
  .where({
    id: req.body.idInput
  })
  .update({
    image: req.body.image
  })
  .then(function(){
    res.redirect('/pets/success-lost');
  })
})
router.get('/add/lost/:id/addimage', function(req, res, next){
  knex('pets')
  .where({
    id: req.params.id
  })
  .first()
  .then(function(data){
    res.locals.pet = data;
    res.render('pets/imageupload');
  });
});
router.post('/add/lost/:id/addimage', function(req, res, next){
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

router.get('/success-lost', function(req, res, next) {
  res.render('pets/success-lost');
});

router.get('/add/found/initial', function(req, res, next) {
  if(req.session.id) {
    res.render('pets/foundinitial');
  }
  else {
    res.render('pets/error');
  }
});

router.post('/add/found/initial', function(req, res, next) {
  console.log(req.body.zip);
  res.render('pets/foundinitial', {success: 'Zip successfully entered'})
})

router.get('/add/found', function(req, res, next) {
  // console.log("FOUND: ", req.session.id);
  if(req.session.id) {
    res.render('pets/reportfound');
  }
  else {
    res.render('pets/error');
  }
});

router.post('/add/found', function(req, res, next) {
  var $phone_number = phoneNumber(req.body.contact);
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
          contact: $phone_number,
          date: req.body.date,
          isFound: 'true'
        })
        .returning('id')
        .then(function(id) {
          console.log("ID: ", id);
          res.redirect('/pets/add/found/' + id + '/addimage');
        })
        .catch(function(err) {
          console.log(err);
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
            contact: $phone_number,
            date: req.body.date,
            isFound: 'true'
          })
          .returning('id')
          .then(function(id) {
            console.log("ID: ", id);
            res.redirect('/pets/add/found/' + id +'/addimage');
          })
          .catch(function(err) {
            console.log(err);;
            res.render('pets/reportfound', { error: "Something went wrong in submitting your form. Please try again." })
          });
    }
});

router.post('/add/found/addimage', function(req, res, next) {
  console.log(req.body);
  knex('pets')
  .where({
    id: req.body.idInput
  })
  .update({
    image: req.body.image
  })
  .then(function(){
    res.redirect('/pets/success-found');
  });
});

router.get('/add/found/:id/addimage', function(req, res, next) {
  console.log("GET: ", req.params.id);
  knex('pets')
  .where({
    id: req.params.id
  })
  .returning('id')
  .then(function(id){
    res.locals.petId = id;
    console.log(res.locals.petId);
    res.render('pets/imageupload');
  });
});

router.post('/add/found/:id/addimage', function(req, res, next) {
  knex('pets')
  .where({
    id: req.params.id
  })
  .insert({
    image: req.body.image
  })
  .then(function(){
    res.render('success-found', {})
  })
});

router.get('/success-found', function(req, res, next) {
  res.render('pets/success-found');
});

router.get('/confirmfound', function(req, res, next){
  res.render('pets/confirmfound')
});

router.get('/:id/profile', function(req, res, next){
  knex('pets')
  .where({
    id: req.params.id
  })
  .first()
  .then(function(pet){
    console.log(pet);
    res.render('pets/profile', {
      pet: pet,
      func: { call: shortenDate }
    })
  })
})

module.exports = router;
