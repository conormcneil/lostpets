var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var knex = require('../../db/knex');


var strategy = new Auth0Strategy({
    domain:       'findingfido.auth0.com',
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.CALLBACK_URL
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    knex('users')
    .where({
      email: profile._json.email
    })
    .first()
    .update({
      auth_user_id: profile.id
    })
    .then(function(data){
    })
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
