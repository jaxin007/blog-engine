import 'reflect-metadata';
import knex from 'knex';
import { injectable } from 'inversify';
import { PostgresServiceInterface } from '../interfaces';
import { knexConfig } from '../config/knex-config';

@injectable()
export class PostgresService implements PostgresServiceInterface {
  public knex: knex;

  constructor() {
    this.knex = knex(knexConfig);
  }
}
