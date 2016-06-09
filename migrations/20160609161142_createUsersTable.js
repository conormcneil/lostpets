
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
