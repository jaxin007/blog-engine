import { User } from '../models';

export interface AuthorizeServiceInterface {
  generateAccessToken(jwtSecretKey: string): string;
  loginUser(userData: User): Promise<string>;
}
