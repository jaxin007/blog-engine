import * as bodyParser from 'body-parser';
import * as express from 'express';
import passport from 'passport';
import { jwtStrategy } from '../auth-config/strategy-config';

passport.use(jwtStrategy);

export function configFn(app: express.Application): void {
  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
}
