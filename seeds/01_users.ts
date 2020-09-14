import * as Knex from 'knex';
import { NewUser } from '../src/models';

export async function seed(knex: Knex): Promise<void> {
  const usersSeed: NewUser[] = [
    {
      name: 'Jack',
      email: 'google@gmail.com',
      password: '123',
    },
    {
      name: 'Dima',
      email: 'yandex@yandex.ru',
      password: '321',
    },
    {
      name: 'Alex',
      email: 'yahoo@outlook.com',
      password: '123321',
    },
  ];

  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    ...usersSeed,
  ]);
}
