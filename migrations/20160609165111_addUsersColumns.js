
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.string('first_name');
    table.string('last_name');
    table.boolean('isAdmin');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumns('first_name', 'last_name', 'isAdmin');
  });
};
