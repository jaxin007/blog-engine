import knex, { Config } from 'knex';

export default class KnexCleaner {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async cleanDB(): Promise<void> {
    try {
      await knex(this.config).schema.raw('TRUNCATE users, posts RESTART IDENTITY CASCADE');
    } catch (err) {
      console.error(err.stack);
    }
  }
}
