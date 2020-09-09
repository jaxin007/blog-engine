import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { config } from '../config/env-config';
import { User } from '../models';
import { AuthorizeServiceInterface, UserServiceInterface } from '../interfaces';
import 'reflect-metadata';
import { TYPES } from './types';

@injectable()
export class AuthService implements AuthorizeServiceInterface {
  @inject(TYPES.UserService) userService: UserServiceInterface

  static hashPassword(password: string, rounds: number): string {
    return bcrypt.hashSync(password, rounds);
  }

  static comparePasswords(requestPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }

  generateAccessToken(jwtSecretKey: string): string {
    const accessToken = jwt.sign({ payload: 'Authorized' }, jwtSecretKey, { expiresIn: '10m' });
    return accessToken;
  }

  async loginUser(userData: User): Promise<string> {
    const { email, password } = userData;

    try {
      const userById = await this.userService.getUserByData(email);
      const checkedUser: boolean = AuthService.comparePasswords(password, userById.password);
      if (!checkedUser) {
        throw Error('Wrong password');
      }
      const token: string = this.generateAccessToken(config.JWT_SECRET_KEY);

      return token;
    } catch (e) {
      throw Error(e);
    }
  }
}
