var knex = require('../../db/knex');

function userIsAuth(req, res, next) {
  console.log('userIsAuth function: ', res.locals.user.isAdmin);
  if (res.locals.user.isAdmin) {
    next();
  } else {
    res.redirect('/');
  };
};

function deleteUser(req, res, next) {
  knex('users')
  .where({
    id:req.params.id
  })
  .del()
  .then(function(data) {
    res.redirect('/admin');
  });
};

module.exports = {
  userIsAuth: userIsAuth,
  deleteUser: deleteUser
}
