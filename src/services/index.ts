import knex from 'knex';
import { PostgresService } from './postgres.service';
import { UserService } from './user.service';

export const postgresService = new PostgresService(knex);
export const userService = new UserService(postgresService);
