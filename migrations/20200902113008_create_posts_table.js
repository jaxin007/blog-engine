/* eslint-disable no-shadow,consistent-return,@typescript-eslint/no-var-requires */
const knex = require('knex');

/**
 * @param {knex} knex
 */
exports.up = function (knex) {
  return knex.schema.hasTable('posts').then((exists) => {
    if (!exists) {
      knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('body', 1000).notNullable();
        table
          .integer('author')
          .index()
          .references('id')
          .inTable('users')
          .onDelete('SET NULL');
        table.date('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.bigInteger('likes');
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts');
};
