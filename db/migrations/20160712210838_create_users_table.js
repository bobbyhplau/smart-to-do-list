exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('uid');
    table.string('email').unique();
    table.string('displayname');
    table.string('displaypic');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
