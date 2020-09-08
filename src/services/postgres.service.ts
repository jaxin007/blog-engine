import * as Knex from 'knex';
import { config } from '../config/env-config';

export class PostgresService {
  readonly knex: Knex

  constructor(knex: any) {
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
