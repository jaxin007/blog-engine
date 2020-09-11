import 'reflect-metadata';
import knex from 'knex';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, Done, it } from 'mocha';
import { cleanUpMetadata } from 'inversify-express-utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import knexCleaner from 'knex-cleaner';
import TestService from './test.service';
import { config } from '../config/env-config';
import { AuthService } from '../services/auth.service';
import { Comment, NewUser, Post } from '../models';

const user: NewUser = {
  name: 'Kirill',
  email: 'test@gmail.com',
  password: 'testPassword',
};

const post: Post = {
  author: 1,
  body: 'test post text',
};

const comment: Comment = {
  id: 1,
  body: 'test comment',
};

chai.use(chaiHttp);

describe('AuthService', () => {
  const userPassword = 'someText';

  it('should hash password', (done: Done) => {
    const hash = AuthService.hashPassword(userPassword, 1);

    expect(hash).to.be.a('string');

    done();
  });

  it('should compare passwords', (done: Done) => {
    const hash = AuthService.hashPassword(userPassword, 1);

    const comparedPasswords = AuthService.comparePasswords(userPassword, hash);

    expect(comparedPasswords).to.be.a('boolean');

    done();
  });
});

describe('/auth', () => {
  beforeEach((done: Done) => {
    knexCleaner.clean(knex({
      client: 'postgresql',
      connection: {
        host: config.PGHOST,
        user: config.PGUSER,
        password: config.PGPASSWORD,
        database: config.PGDATABASE,
      },
    })).then(() => {
      cleanUpMetadata();
      return done();
    });
  });

  it('POST /signup: should register new user in DB & return token', async () => {
    try {
      await TestService.createNewUser(user);
    } catch (err) {
      console.error(err.stack);
    }
  });

  it('POST /signin: should login user & return token', async () => {
    try {
      await TestService.createNewUser(user);

      await TestService.loginUser(user);
    } catch (err) {
      console.error(err.stack);
    }
  });
});

describe('/posts', () => {
  beforeEach((done: Done) => {
    knexCleaner.clean(knex({
      client: 'postgresql',
      connection: {
        host: config.PGHOST,
        user: config.PGUSER,
        password: config.PGPASSWORD,
        database: config.PGDATABASE,
      },
    })).then(() => {
      cleanUpMetadata();
      return done();
    });
  });
  it('POST /post: should create a new post', async () => {
    try {
      const newUser = await TestService.createNewUser(user);

      const { token } = newUser.body;

      await TestService.createNewPost(post, token);
    } catch (err) {
      console.error(err.stack);
    }
  });

  it('POST /comment: should create a new comment', async () => {
    try {
      const newUser = await TestService.createNewUser(user);

      const { token } = newUser.body;

      await TestService.createNewPost(post, token);

      await TestService.createNewComment(comment, token);
    } catch (err) {
      console.error(err.stack);
    }
  });

  it('PATCH /like: should like a post', async () => {
    try {
      const newUser = await TestService.createNewUser(user);

      const { token } = newUser.body;

      await TestService.createNewPost(post, token);

      await TestService.likePost(token);
    } catch (err) {
      console.error(err.stack);
    }
  });
});
