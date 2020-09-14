import * as bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import { jwtStrategy } from './passport-config';

passport.use(jwtStrategy);

export function configFn(app: express.Application): void {
  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
}
