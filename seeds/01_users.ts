import * as Knex from 'knex';
import { User } from '../src/models';

export async function seed(knex: Knex): Promise<void> {
  const usersSeed: User[] = [
    {
      id: 1,
      name: 'Jack',
      email: 'google@gmail.com',
      password: '123',
    },
    {
      id: 2,
      name: 'Dima',
      email: 'yandex@yandex.ru',
      password: '321',
    },
    {
      id: 3,
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
