/* eslint-disable no-shadow,consistent-return,@typescript-eslint/no-var-requires */
const knex = require('knex');

/**
 * @param {knex} knex
 */
exports.up = function (knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email', 100).unique().notNullable();
        table.string('name', 100).notNullable();
        table.string('password', 100).notNullable();
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
