
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumns('id','username','password','email','image','first_name','last_name','isAdmin');
  });
};

exports.down = function(knex, Promise) {
  // Doesn't matter what goes here: will never run rollback from this migration
  return knex.schema.alterTable('users', function(table) {
    table.dropColumns('phone_number');
  });
};
