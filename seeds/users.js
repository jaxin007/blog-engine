/* eslint-disable arrow-body-style */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Jack',
          email: 'google@gmail.com',
          password: '123',
        },
      ]);
    });
};
