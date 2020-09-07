import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import passport from 'passport';
import { appHandler } from './services';
import { jwtStrategy } from './auth-config/strategy-config';

require('express-async-errors');

const port = process.env.PORT || 3000;

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

app.post('/signin', appHandler.signInHandler);

app.post('/signup', appHandler.signUpHandler);

app.use(passport.authenticate('jwt', { session: false }));

app.get('/users', appHandler.getAllUsersHandler);

app.get('/post/:id', appHandler.getPostByIdHandler);

app.get('/posts', appHandler.getAllPostsHandler);

app.post('/post', appHandler.createPostHandler);

app.post('/comment', appHandler.createCommentHandler);

app.patch('/like/:id', appHandler.likePostHandler);

app.patch('/dislike/:id', appHandler.dislikePostHandler);

app.use(appHandler.errorHandler);

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
