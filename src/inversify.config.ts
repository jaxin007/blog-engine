import { Container } from 'inversify';
import { TYPES } from './services/types';
import {
  AuthorizeServiceInterface,
  PostgresServiceInterface,
  UserServiceInterface,
  EnvConfigInterface,
} from './interfaces';
import { UserService } from './services/user.service';
import { PostgresService } from './services/postgres.service';
import { AuthService } from './services/auth.service';
import { config } from './config/env-config';

export const container = new Container();
container.bind<AuthorizeServiceInterface>(TYPES.AuthService).to(AuthService);
container.bind<UserServiceInterface>(TYPES.UserService).to(UserService);
container.bind<PostgresServiceInterface>(TYPES.PostgresService).to(PostgresService);
container.bind<EnvConfigInterface>(TYPES.EnvConfig).toConstantValue(config);
