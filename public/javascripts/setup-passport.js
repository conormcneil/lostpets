var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'findingfido.auth0.com',
    clientID:     'odLWNoZNGYeONIG3KeVCisJcta40sQeQ',
    clientSecret: 'AgefF9BdjyrWYjlS3BxW4njA3jnvMY-eiR9Dhb_k2QNzL5FULyWLeS3tAab9YFND',
    callbackURL:  'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
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
