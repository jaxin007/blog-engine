import express, {
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

app.get('/users', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const allUsers: User[] = await userService.getAllUsers();

    return res.status(200).json(allUsers);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(e.message);
  }
});

app.get('/post/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  const postId : number = +req.params.id;

  try {
    const postById = await userService.getPostById(postId);

    return res.status(200).json(postById);
  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});

app.get('/posts', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    const allPosts = await userService.getAllPosts({ limit, offset } as SearchParams);

    return res.status(200).json(allPosts);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(e.message);
  }
});

app.post('/signin', async (req: Request, res: Response) => {
  const userData: User = req.body;

  try {
    const token = await authService.loginUser(userData);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(e.message);
  }
});

app.post('/signup', async (req: Request, res: Response) => {
  const { email, name, password }: NewUser = req.body;

  try {
    await userService.registerUser({ name, email, password });

    const token = authService.generateAccessToken();

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(e.message);
  }
});

app.post('/post', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  const { body, id }: Post = req.body;

  try {
    const newPost: UserPost = await userService.createPost({ body, id });

    return res.status(200).json(newPost);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(e.message);
  }
});

app.post('/comment', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  const { body, id }: Comment = req.body;

  try {
    const createdComment = await userService.createComment(body, id);

    return res.status(200).json(createdComment);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e.message);
  }
});

app.patch('/like/:id', async (req: Request, res: Response) => {
  const id: number = +req.params.id;

  try {
    const likedPost = await userService.likePost(id);

    return res.status(200).json(likedPost);
  } catch (e) {
    console.error(e);

    return res.status(500).json(e.message);
  }
});

app.patch('/dislike/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  const id: number = +req.params.id;

  try {
    const dislikedPost = await userService.dislikePost(id);

    return res.status(200).json(dislikedPost);
  } catch (e) {
    console.error(e);

    return res.status(500).json(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
