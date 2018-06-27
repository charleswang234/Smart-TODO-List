
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
    table.string('first-name');
    table.string('last-name');
    table.string('email');
    table.string('password');
    table.dropColumn('name');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('first-name');
      table.dropColumn('last-name');
      table.dropColumn('email');
      table.dropColumn('password');
      table.string('name');
    })
    ]);
};
