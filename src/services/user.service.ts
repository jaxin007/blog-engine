import { inject, injectable } from 'inversify';
import {
  User, NewUser, UserPost, Post, SearchParams,
} from '../models';
import { PostgresServiceInterface, UserServiceInterface } from '../interfaces';
import { TYPES } from './types';
import { AuthService } from './auth.service';

@injectable()
export class UserService implements UserServiceInterface {
  @inject(TYPES.PostgresService) private postgresService: PostgresServiceInterface;

  async getUserByData(email: string): Promise<User> {
    const userById = await this.postgresService
      .knex('users')
      .where('email', email)
      .returning('*');

    return userById[0];
  }

  async registerUser(user: NewUser): Promise<User> {
    const { name, email, password } = user;
    const hashedPassword: string = await AuthService.hashPassword(password, 1);

    const newUser = await this
      .postgresService
      .knex('users')
      .insert({ email, name, password: hashedPassword })
      .returning('*');

    return newUser[0];
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.postgresService
      .knex('users')
      .select(['id', 'name', 'email'])
      .returning('*');

    return allUsers;
  }

  async createPost(post: Post): Promise<UserPost> {
    const { body, id } = post;

    const createdPost = await this.postgresService
      .knex('posts')
      .insert({ body, author: id })
      .returning('*');

    return createdPost[0];
  }

  async getPostById(id: number): Promise<UserPost> {
    const postById = await this.postgresService
      .knex('posts')
      .where('id', id)
      .first()
      .returning('*');

    return postById[0];
  }

  async getAllPosts(searchParams: SearchParams): Promise<UserPost[]> {
    const postsResponse = await this.postgresService
      .knex('posts')
      .orderBy('id')
      .limit(+searchParams.limit)
      .offset(+searchParams.offset);

    return postsResponse;
  }

  async createComment(body: string, id: number): Promise<UserPost> {
    const createdComment = await this.postgresService
      .knex('posts')
      .where('id', id)
      .update({ body })
      .returning('*');

    return createdComment[0];
  }

  async likePost(id: number): Promise<UserPost> {
    const likedPost = await this.postgresService
      .knex('posts')
      .where('id', id)
      .increment('likes')
      .returning('*');

    return likedPost[0];
  }

  async dislikePost(id: number): Promise<User> {
    const dislikedPost = await this.postgresService
      .knex('posts')
      .where('id', id)
      .decrement('likes')
      .returning('*');

    return dislikedPost[0];
  }
}
