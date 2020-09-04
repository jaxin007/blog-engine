import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { authService, userService } from './index';

export class AuthService {
  private readonly JwtSecretKey = process.env.JWT_SECRET_KEY || 'dff$asdcAs';

  hashPassword(password: string, rounds: number): string {
    return bcrypt.hashSync(password, rounds);
  }

  comparePasswords(requestPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }

  generateAccessToken(): string {
    const accessToken = jwt.sign({ payload: 'Authorized' }, this.JwtSecretKey, { expiresIn: '10m' });
    return accessToken;
  }

  async loginUser(userData: User) {
    const { id, password } = userData;

    try {
      const userById = await userService.getUserById(id);
      const checkedUser: boolean = await authService.comparePasswords(password, userById.password);
      console.log(checkedUser);
      if (!checkedUser) {
        throw Error('Wrong password');
      }
      const token: string = this.generateAccessToken();

      return token;
    } catch (e) {
      throw Error(e);
    }
  }
}
