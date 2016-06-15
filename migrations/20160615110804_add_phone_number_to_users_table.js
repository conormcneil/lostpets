
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.bigInteger('phone_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumns('phone_number');
  });
};
