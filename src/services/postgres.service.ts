export class PostgresService {
  private knex: any;

  constructor(knex) {
    this.knex = knex({
      client: 'pg',
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        port: process.env.PGPORT,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
      pool: { min: 0, max: 7 },
    });
  }
}
