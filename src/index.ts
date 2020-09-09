import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';
import { configFn } from './config/configFn';
import { errConfigFn } from './config/errorConfigFn';
import { config } from './config/env-config';
// declare metadata by @controller annotation
import './controllers/index';

const server = new InversifyExpressServer(container);
server
  .setConfig(configFn)
  .setErrorConfig(errConfigFn)
  .build()
  .listen(config.PORT, 'localhost', () => {
    console.log(`server listened on port ${config.PORT}`);
  });
