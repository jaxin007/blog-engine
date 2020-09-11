import 'reflect-metadata';
import chai, { expect } from 'chai';
import { app } from '../index';
import { Comment, NewUser, Post } from '../models';

export default class TestService {
  static async createNewUser(user: NewUser): Promise<any> {
    const newUser = await chai.request(app)
      .post('/auth/signup')
      .send(user);

    expect(newUser).status(200);
    expect(newUser.body).to.have.property('token');

    return newUser;
  }

  static async loginUser(user: NewUser): Promise<any> {
    const authorizedUser = await chai.request(app)
      .post('/auth/signin')
      .send(user);

    expect(authorizedUser).status(200);
    expect(authorizedUser.body).to.have.property('token');

    return authorizedUser;
  }

  static async createNewPost(post: Post, token: string): Promise<any> {
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

  static async createNewComment(comment: Comment, token: string): Promise<any> {
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

  static async likePost(token: string): Promise<any> {
    const likedPost = await chai.request(app)
      .patch('/posts/like/1')
      .set('authorization', `Bearer ${token}`);

    const { body } = likedPost;

    expect(likedPost).status(200);

    expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);

    expect(likedPost).to.be.a('object');

    return likedPost;
  }
}
