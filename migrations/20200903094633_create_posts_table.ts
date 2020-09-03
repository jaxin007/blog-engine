import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line consistent-return
  return knex.schema.hasTable('posts').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('posts', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('body', 1000).notNullable();
        table
          .integer('author')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.string('comment', 1000).defaultTo('');
        table.bigInteger('likes').defaultTo(0);
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts');
}
