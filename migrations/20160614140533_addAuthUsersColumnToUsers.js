
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.string('auth_user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumn('auth_user_id');
  });
};
