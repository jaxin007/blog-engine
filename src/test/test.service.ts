import 'reflect-metadata';
import chai, { expect } from 'chai';
import { app } from '../index';
import { Comment, NewUser, Post } from '../models';

export default class TestService {
  static async createNewUser(user: NewUser): Promise<ChaiHttp.Response> {
    const newUser = await chai.request(app)
      .post('/auth/signup')
      .send(user);

    expect(newUser).status(200);
    expect(newUser.body).to.have.property('token');

    return newUser;
  }

  static async loginUser(user: NewUser): Promise<ChaiHttp.Response> {
    const authorizedUser = await chai.request(app)
      .post('/auth/signin')
      .send(user);

    expect(authorizedUser).status(200);
    expect(authorizedUser.body).to.have.property('token');

    return authorizedUser;
  }

  static async checkAuthorization(): Promise<ChaiHttp.Response> {
    const unauthorizedRequest = await chai.request(app)
      .get('/users/users');

    expect(unauthorizedRequest).status(401);

    return unauthorizedRequest;
  }

  static async createNewPost(post: Post, token: string): Promise<ChaiHttp.Response> {
    const newPost = await chai.request(app)
      .post('/posts/post')
      .send(post)
      .set('authorization', `Bearer ${token}`);

    const { body } = newPost;

    expect(newPost).status(200);

    expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);

    expect(newPost).to.be.a('object');

    return newPost;
  }

  static async getPostsList(token: string): Promise<ChaiHttp.Response> {
    const postsList = await chai.request(app)
      .get('/posts/posts?limit=1&offset=1')
      .set('authorization', `Bearer ${token}`);

    expect(postsList).status(200);

    expect(postsList).to.be.a('object');

    return postsList;
  }

  static async createNewComment(comment: Comment, token: string): Promise<ChaiHttp.Response> {
    const newComment = await chai.request(app)
      .post('/posts/comment')
      .send(comment)
      .set('authorization', `Bearer ${token}`);

    const { body } = newComment;

    expect(newComment).status(200);

    expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);

    expect(newComment).to.be.a('object');

    return newComment;
  }

  static async likePost(token: string): Promise<ChaiHttp.Response> {
    const likedPost = await chai.request(app)
      .patch('/posts/like/1')
      .set('authorization', `Bearer ${token}`);

    const { body } = likedPost;

    expect(likedPost).status(200);

    expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);

    expect(likedPost).to.be.a('object');

    return likedPost;
  }

  static async dislikePost(token: string): Promise<ChaiHttp.Response> {
    const dislikedPost = await chai.request(app)
      .patch('/posts/dislike/1')
      .set('authorization', `Bearer ${token}`);

    const { body } = dislikedPost;

    expect(dislikedPost).status(200);

    expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);

    expect(dislikedPost).to.be.a('object');

    return dislikedPost;
  }
}
