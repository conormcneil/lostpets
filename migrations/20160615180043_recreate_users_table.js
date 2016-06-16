
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('image');
    table.string('first_name');
    table.string('last_name');
    table.boolean('isAdmin').defaultTo(false);
    table.string('auth_user_id');
    table.bigInteger('phone_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
