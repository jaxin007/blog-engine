import {
  NewUser, Post, SearchParams, User, UserPost,
} from '../models';

export interface UserServiceInterface {
  getUserByData(email: string): Promise<User>;
  registerUser(user: NewUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  createPost(post: Post): Promise<UserPost>;
  getPostById(id: number): Promise<UserPost>;
  getAllPosts(searchParams: SearchParams): Promise<UserPost[]>;
  createComment(body: string, id: number): Promise<UserPost>;
  likePost(id: number): Promise<UserPost>;
  dislikePost(id: number): Promise<User>;
}
