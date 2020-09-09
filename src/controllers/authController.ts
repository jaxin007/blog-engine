import { Response, Request, NextFunction } from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpPatch,
  request,
  queryParam,
  response,
  requestParam,
  requestBody, httpMethod,
} from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import { TYPES } from '../services/types';
import { AuthorizeServiceInterface, UserServiceInterface } from '../interfaces';
import { NewUser, User } from '../models';
import { config } from '../config/env-config';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  @inject(TYPES.UserService) private userService: UserServiceInterface;

  @inject(TYPES.AuthService) private authService: AuthorizeServiceInterface;

  @httpPost('/signup')
  private async signUp(req: Request, res: Response): Promise<Response> {
    const { email, name, password }: NewUser = req.body;

    await this.userService.registerUser({ name, email, password });

    const token = this.authService.generateAccessToken(config.JWT_SECRET_KEY);

    return res.status(200).json({ token });
  }

  @httpPost('signin')
  private async signIn(req: Request, res: Response): Promise<Response> {
    const userData: User = req.body;

    const token = await this.authService.loginUser(userData);

    return res.status(200).json({ token });
  }
}
