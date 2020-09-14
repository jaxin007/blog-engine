import * as express from 'express';

export function errConfigFn(app: express.Application): void {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    return res.status(500).json(err.message);
  });
}
