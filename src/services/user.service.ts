import { PostgresService } from './postgres.service';
import {
  User, NewUser, UserPost, Post,
} from '../models';

export class UserService {
  /**
   * @param {PostgresService} postgresService
   */
  constructor(private postgresService: PostgresService) {
    this.postgresService = postgresService;
  }

  async getUserById(id: number): Promise<User> {
    const userById = this.postgresService
      .knex<User>('users')
      .where('id', id)
      .first();

    return userById;
  }

  async registerUser(user: NewUser): Promise<User> {
    const { name, email, password } = user;

    const newUser = await this
      .postgresService
      .knex('users')
      .insert({ email, name, password })
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

  async getAllPosts(): Promise<UserPost[]> {
    const allPosts = await this.postgresService
      .knex('posts')
      .select('*')
      .returning('*');

    return allPosts;
  }
}
