import express, {
  NextFunction,
  Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import passport from 'passport';
import { userService, authService } from './services';
import { jwtStrategy } from './auth-config/strategy-config';
import {
  Comment,
  NewUser,
  Post,
  SearchParams,
  User,
  UserPost,
} from './models';

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

app.post('/signin', async (req: Request, res: Response) => {
  const userData: User = req.body;

  const token = await authService.loginUser(userData);

  return res.status(200).json({ token });
});

app.post('/signup', async (req: Request, res: Response) => {
  const { email, name, password }: NewUser = req.body;

  await userService.registerUser({ name, email, password });

  const token = authService.generateAccessToken();

  return res.status(200).json({ token });
});

app.use(passport.authenticate('jwt', { session: false }));

app.get('/users', async (req: Request, res: Response) => {
  const allUsers: User[] = await userService.getAllUsers();

  return res.status(200).json(allUsers);
});

app.get('/post/:id', async (req: Request, res: Response) => {
  const postId : number = +req.params.id;
  const postById: Post = await userService.getPostById(postId);

  return res.status(200).json(postById);
});

app.get('/posts', async (req: Request, res: Response) => {
  const { limit, offset } = req.query;

  const allPosts: Post[] = await userService.getAllPosts({ limit, offset } as SearchParams);

  return res.status(200).json(allPosts);
});

app.post('/post', async (req: Request, res: Response) => {
  const { body, id }: Post = req.body;
  const newPost: UserPost = await userService.createPost({ body, id });

  return res.status(200).json(newPost);
});

app.post('/comment', async (req: Request, res: Response) => {
  const { body, id } = req.body;

  const createdComment: Comment = await userService.createComment(body, id);

  return res.status(200).json(createdComment);
});

app.patch('/like/:id', async (req: Request, res: Response) => {
  const id: number = +req.params.id;

  const likedPost = await userService.likePost(id);

  return res.status(200).json(likedPost);
});

app.patch('/dislike/:id', async (req: Request, res: Response) => {
  const id: number = +req.params.id;

  const dislikedPost = await userService.dislikePost(id);

  return res.status(200).json(dislikedPost);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  return res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
