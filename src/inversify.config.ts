import { Container } from 'inversify';
import { TYPES } from './services/types';
import {
  AuthorizeServiceInterface,
  PostgresServiceInterface,
  UserServiceInterface,
} from './interfaces';
import { UserService } from './services/user.service';
import { PostgresService } from './services/postgres.service';
import { AuthService } from './services/auth.service';

export const myContainer = new Container();
myContainer.bind<AuthorizeServiceInterface>(TYPES.AuthService).to(AuthService);
myContainer.bind<UserServiceInterface>(TYPES.UserService).to(UserService);
myContainer.bind<PostgresServiceInterface>(TYPES.PostgresService).to(PostgresService);
