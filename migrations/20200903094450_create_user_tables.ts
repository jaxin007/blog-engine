import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line consistent-return
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('email', 100).unique().notNullable();
        table.string('name', 100).defaultTo('');
        table.string('password', 100).notNullable();
        table.integer('role', 10).notNullable().defaultTo(0);
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
