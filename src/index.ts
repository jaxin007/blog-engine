import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import { config } from './config/env-config';
import { jwtStrategy } from './auth-config/strategy-config';
import { authRouter, postsRouter } from './router';
import { Controllers } from './controllers/controllers';

const port = config.PORT;

passport.use(jwtStrategy);

const app = express();

app.use(passport.initialize());

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.use(Controllers.errorHandler);

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
