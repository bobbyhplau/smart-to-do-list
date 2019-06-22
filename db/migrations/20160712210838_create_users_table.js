exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('email').unique();
    table.string('displayname');
    table.string('displaypic');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
