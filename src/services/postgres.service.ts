import 'reflect-metadata';
import knex from 'knex';
import { injectable } from 'inversify';
import { config } from '../config/env-config';
import { PostgresServiceInterface } from '../interfaces';

@injectable()
export class PostgresService implements PostgresServiceInterface {
  public knex: knex;

  constructor() {
    this.knex = knex({
      client: 'pg',
      connection: {
        host: config.PGHOST,
        user: config.PGUSER,
        port: config.PGPORT,
        password: config.PGPASSWORD,
        database: config.PGDATABASE,
      },
      pool: { min: 0, max: 7 },
    });
  }
}
