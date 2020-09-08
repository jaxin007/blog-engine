import passportJWT from 'passport-jwt';
import { config } from '../config/env-config';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const JwtSecretKey = config.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSecretKey,
};

export const jwtStrategy = new JwtStrategy(opts, (payload, next) => {
  next(null, payload);
});
