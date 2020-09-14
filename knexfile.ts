import { config } from './src/config/env-config';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: config.PGHOST,
      user: config.PGUSER,
      password: config.PGPASSWORD,
      database: config.PGDATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
