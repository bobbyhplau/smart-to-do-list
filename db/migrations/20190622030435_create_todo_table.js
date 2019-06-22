exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', function(table) {
      table.increments('id');
      table.integer('userid');
      table.string('text');
      table.string('category');
      table.boolean('isComplete');
      table.integer('order');
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('email').unique();
      table.string('displayname');
      table.string('displaypic');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos'),
    knex.schema.dropTable('users')
  ])
};
