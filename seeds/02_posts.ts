import * as Knex from 'knex';
import { UserPost } from '../src/models';

export async function seed(knex: Knex): Promise<void> {
  const posts: UserPost[] = [
    {
      id: 1,
      body: 'Hello!',
      author: 1,
      likes: 0,
      comment: 'Mazda',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 2,
      body: 'Hello World!',
      author: 1,
      likes: 3,
      comment: 'BMW',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 4,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 5,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 6,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 7,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 8,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 9,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      id: 10,
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
  ];
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('posts').insert([
    ...posts,
  ]);
}
