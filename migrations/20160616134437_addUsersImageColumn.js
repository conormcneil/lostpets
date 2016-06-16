
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.string('user_image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumn('user_image');
  });
};
