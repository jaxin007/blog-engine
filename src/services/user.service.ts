import { authService } from './index';
import { PostgresService } from './postgres.service';
import { userSchema, validator } from './user.validator';
import {
  User, NewUser, UserPost, Post, SearchParams,
} from '../models';

export class UserService {
  /**
   * @param {PostgresService} postgresService
   */
  constructor(private postgresService: PostgresService) {
    this.postgresService = postgresService;
  }

  async getUserById(id: number): Promise<User> {
    const userById = await this.postgresService
      .knex('users')
      .where('id', id)
      .returning('*');

    return userById[0];
  }

  async registerUser(user: NewUser): Promise<User> {
    const { name, email, password } = user;
    const hashedPassword: string = await authService.hashPassword(password, 1);

    const isValidatedUser = await validator
      .validate(
        { name, email, password: hashedPassword },
        userSchema,
      );

    if (isValidatedUser !== true) throw isValidatedUser[0];

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
