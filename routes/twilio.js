var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // Twilio Credentials
//   var accountSid = process.env.TWILIO_ACCOUNT_SID;
//   var authToken = process.env.TWILIO_AUTH_TOKEN;
//   //require the Twilio module and create a REST client
//   var client = require('twilio')(accountSid, authToken);
//   client.messages.create({
//    to: "+15202751232",
//    from: "+15203554290",
//    body: "This is a test from the twilio route!",
//   }, function(err, message) {
//    console.log(message.sid);
//   });
//   res.render('index', {
//     title: 'Twilio Test Page'
//   });
// });

router.get('/:id', function(req, res, next){
  knex('pets')
  .where({
    id: req.params.id
  })
  .first()
  .then(function(pet){
    console.log(pet.user_id);
    knex('users')
    .where({
      id: pet.user_id
    })
    .first()
    .then(function(user){
      // Twilio Credentials
      var accountSid = process.env.TWILIO_ACCOUNT_SID;
      var authToken = process.env.TWILIO_AUTH_TOKEN;
      //require the Twilio module and create a REST client
      var client = require('twilio')(accountSid, authToken);
      client.messages.create({
       to: "+" + user.phone_number,
       from: "+15203554290",
       body: "Someone found " + pet.name,
      }, function(err, message) {
       console.log(message.sid);
      });
      console.log("+" + user.phone_number);
      res.redirect('/pets/confirmfound');
    })
  })
})

module.exports = router;
