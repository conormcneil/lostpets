
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.string('age');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.dropColumn('age');
  });
};
