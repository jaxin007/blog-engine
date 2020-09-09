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

export const container = new Container();
container.bind<AuthorizeServiceInterface>(TYPES.AuthService).to(AuthService);
container.bind<UserServiceInterface>(TYPES.UserService).to(UserService);
container.bind<PostgresServiceInterface>(TYPES.PostgresService).to(PostgresService);