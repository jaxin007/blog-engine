import * as express from 'express';
import passport from 'passport';
import { Controllers } from '../controllers/controllers';

require('express-async-errors');

export const postsRouter = express.Router();

postsRouter.use(passport.authenticate('jwt', { session: false }));

postsRouter.get('/posts', Controllers.getAllPostsHandler);

postsRouter.get('/post/:id', Controllers.getPostByIdHandler);

postsRouter.get('/users', Controllers.getAllUsersHandler);

postsRouter.post('/post', Controllers.createPostHandler);

postsRouter.post('/comment', Controllers.createCommentHandler);

postsRouter.patch('/like/:id', Controllers.likePostHandler);

postsRouter.patch('/dislike/:id', Controllers.dislikePostHandler);
