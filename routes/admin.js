var express = require('express');
var router = express.Router();
// Include functions from /routes/lib/users.js
var admin = require('./lib/admin.js');


// Authorize User as Admin
// router.use(admin.userIsAuth);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Admin Route'
  });
});

module.exports = router;
