import 'reflect-metadata';
import knex from 'knex';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, Done, it } from 'mocha';
import { cleanUpMetadata } from 'inversify-express-utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import knexCleaner from 'knex-cleaner';
import { app } from '../index';
import { config } from '../config/env-config';
import { AuthService } from '../services/auth.service';

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

describe('POST /auth', () => {
  after(() => {
    knexCleaner.clean(knex({
      client: 'postgresql',
      connection: {
        host: config.PGHOST,
        user: config.PGUSER,
        password: config.PGPASSWORD,
        database: config.PGDATABASE,
      },
    }));
    cleanUpMetadata();
  });

  it('should have status code 200 & register new user in DB & return jwt token', async () => {
    try {
      const testResponse = await chai.request(app)
        .post('/auth/signup')
        .send({ name: 'Kirill', email: 'test@gmail.com', password: 'testPassword' });

      expect(testResponse).status(200);

      expect(testResponse.body).to.have.property('token');
    } catch (e) {
      console.error(e.stack);
    }
  });
});
