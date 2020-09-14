import { Config } from 'knex';
import { config } from './env-config';

export const knexConfig: Config = {
  client: 'postgresql',
  connection: {
    host: config.PGHOST,
    user: config.PGUSER,
    port: config.PGPORT,
    password: config.PGPASSWORD,
    database: config.PGDATABASE,
  },
  pool: { min: 0, max: 7 },
};
