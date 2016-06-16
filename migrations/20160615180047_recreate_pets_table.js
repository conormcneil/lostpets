
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pets', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('species');
    table.string('location');
    table.string('description');
    table.integer('user_id');
    table.boolean('isFound');
    table.string('image');
    table.bigInteger('contact');
    table.string('date');
    table.boolean('isRecovered');
    table.string('age');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pets');
};
