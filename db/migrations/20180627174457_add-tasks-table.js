
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id');
    table.string('activity');
    table.boolean('completed');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('category_id');
    table.foreign('category_id').references('categories.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
