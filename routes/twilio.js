var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Twilio Credentials
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
   to: "+15202751232",
   from: "+15203554290",
   body: "This is a test from the twilio route!",
  }, function(err, message) {
   console.log(message.sid);
  });




  res.render('index', {
    title: 'Twilio Test Page'
  });
});

module.exports = router;
