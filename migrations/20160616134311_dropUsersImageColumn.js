
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumn('image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.string('image');
  });
};
