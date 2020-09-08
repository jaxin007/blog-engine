import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env-config';
import { User } from '../models';
import { userService } from './index';

export class AuthService {
  static hashPassword(password: string, rounds: number): string {
    return bcrypt.hashSync(password, rounds);
  }

  static comparePasswords(requestPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }

  static generateAccessToken(jwtSecretKey: string): string {
    const accessToken = jwt.sign({ payload: 'Authorized' }, jwtSecretKey, { expiresIn: '10m' });
    return accessToken;
  }

  static async loginUser(userData: User): Promise<string> {
    const { email, password } = userData;

    try {
      const userById = await userService.getUserByData(email);
      const checkedUser: boolean = await this.comparePasswords(password, userById.password);
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
