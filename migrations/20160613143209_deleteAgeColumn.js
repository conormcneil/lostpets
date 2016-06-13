
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.dropColumn('age');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.integer('age');
  });
};
