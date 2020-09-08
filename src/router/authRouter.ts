import * as express from 'express';
import { Controllers } from '../controllers/controllers';

require('express-async-errors');

export const authRouter = express.Router();

authRouter.post('/signin', Controllers.validateUser, Controllers.signInHandler);

authRouter.post('/signup', Controllers.validateUser, Controllers.signUpHandler);
