import { Response, Request, NextFunction } from 'express';
import { interfaces, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import passport from 'passport';
import { TYPES } from '../services/types';
import { AuthorizeServiceInterface, UserServiceInterface } from '../interfaces';
import { User } from '../models';
import { userSchema, validator } from '../services/user.validator';
import { EnvConfigInterface } from '../interfaces/EnvConfigInterface';

@controller('/users', passport.authenticate('jwt', { session: false }))
export class UsersController implements interfaces.Controller {
  @inject(TYPES.UserService) private userService: UserServiceInterface;

  @inject(TYPES.AuthService) private authService: AuthorizeServiceInterface;

  @inject(TYPES.EnvConfig) private config: EnvConfigInterface

  private async validateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password }: User = req.body;
    const isValidatedUser = await validator
      .validate(
        { name, email, password },
        userSchema,
      );

    if (isValidatedUser !== true) throw isValidatedUser[0];
    next();
  }

  @httpGet('/users')
  private async getAllUsers(req: Request, res: Response): Promise<Response> {
    const allUsers: User[] = await this.userService.getAllUsers();
    return res.status(200).json(allUsers);
  }
}