import bcrypt from 'bcrypt';

export class AuthService {
  hashPassword(password: string, rounds: number): string {
    return bcrypt.hashSync(password, rounds);
  }

  comparePasswords(requestPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }
}
