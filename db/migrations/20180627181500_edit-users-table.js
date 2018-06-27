
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.string('first_name');
      table.string('last_name');
      table.dropColumn('first-name');
      table.dropColumn('last-name');
    })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('first-name');
      table.string('last-name');
      table.dropColumn('first_name');
      table.dropColumn('last_name');
    })
    ]);
};
