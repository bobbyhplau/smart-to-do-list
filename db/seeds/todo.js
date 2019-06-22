exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function() {
      return Promise.all([
        knex('todos').insert({
          userid: 1,
          text: 'Sal y Limon',
          category: 'restaurant',
          isComplete: false,
          order: 1
        }),
        knex('todos').insert({
          userid: 1,
          text: 'Avengers',
          category: 'movie',
          isComplete: false,
          order: 1
        }),
        knex('todos').insert({
          userid: 1,
          text: 'Savio Volpe',
          category: 'restaurant',
          isComplete: false,
          order: 2
        }),
        knex('todos').insert({
          userid: 2,
          text: 'Kafka on the Shore',
          category: 'book',
          isComplete: false,
          order: 1
        })
      ]);
    });
};
