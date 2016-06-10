
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.date('date');
    table.boolean('isRecovered').defaultTo('false');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.dropColumn('date');
    table.dropColumn('isRecovered');
  });
};
