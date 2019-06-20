exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return Promise.all([
        knex('users').insert({
          email: 'test@test.com',
          displayname: 'testuser',
          displaypic: 'https://vanillicon.com/v2/b642b4217b34b1e8d3bd915fc65c4452.svg'
        }),
        knex('users').insert({
          email: 'a@example.com',
          displayname: 'lighthouse',
          displaypic: 'https://vanillicon.com/v2/b418773a2c51fb9777a1648346fa7394.svg'
        }),
        knex('users').insert({
          email: 'b@example.com',
          displayname: 'ramennoodles',
          displaypic: 'https://vanillicon.com/v2/b418773a2c51fb9777a1648346fa7394.svg'
        })
      ]);
    });
};
