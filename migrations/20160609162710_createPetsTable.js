
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pets', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('species');
    table.string('location');
    table.integer('age');
    table.string('description');
    table.integer('user_id');
    table.boolean('isFound');
    table.string('image');
    table.string('contact');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pets');
};
