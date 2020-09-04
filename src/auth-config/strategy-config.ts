import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { authService, userService } from '../services';
import { User } from '../models';
import 'dotenv/config';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const JwtSecretKey = process.env.JWT_SECRET_KEY || 'dff$asdcAs';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSecretKey,
};

export const jwtStrategy = new JwtStrategy(opts, (payload, next) => {
  next(null, payload);
});
