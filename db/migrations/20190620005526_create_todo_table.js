exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo', function(table) {
      table.increments('tid');
      table.integer('userid');
      table.string('text');
      table.string('category');
      table.boolean('isComplete');
      table.integer('order');
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('uid');
      table.string('email').unique();
      table.string('displayname');
      table.string('displaypic');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todo'),
    knex.schema.dropTable('users')
  ])
};
