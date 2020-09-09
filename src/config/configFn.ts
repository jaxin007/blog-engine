import * as bodyParser from 'body-parser';
import * as express from 'express';

export function configFn(app: express.Application): void {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
}
