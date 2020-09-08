import 'dotenv/config';

export const config = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'dff$asdcAs',

  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'secret',

  PGHOST: process.env.PGHOST || 'localhost',
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || 'secret',
  PGPORT: process.env.PGPORT || 3300,

  PORT: process.env.PORT || 3000,
};