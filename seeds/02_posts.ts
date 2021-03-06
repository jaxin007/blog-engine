import * as Knex from 'knex';
import { UserPost } from '../src/models';

export async function seed(knex: Knex): Promise<void> {
  const posts: UserPost[] = [
    {
      body: 'Hello!',
      author: 1,
      likes: 0,
      comment: 'Mazda',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello World!',
      author: 1,
      likes: 3,
      comment: 'BMW',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
      body: 'Hello!',
      author: 1,
      likes: 25,
      comment: 'Peugeot',
      created_at: '2020-09-03T05:30:38.779Z',
    },
    {
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
