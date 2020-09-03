import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { userService } from './services';
import { PostByUser, User, UserPost } from './models';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/users', async (req: Request, res: Response) => {
  await userService
    .getAllUsers()
    .then((users: User[]) => res.status(200).json({ users }))
    .catch((err) => res.status(500).json({ errMessage: err.message }));
});

app.get('/post/:id', async (req: Request, res: Response) => {
  const userId : number = +req.params.id;

  await userService
    .getPostById(userId)
    .then((post: UserPost) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err.details));
});

app.get('/posts', async (req: Request, res: Response) => {
  await userService
    .getAllPosts()
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ errMessage: err });
    });
});

app.post('/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  await userService
    .registerUser({ name, email, password })
    .then((user: User) => res.status(200).json({ user }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ errMessage: err.message });
    });
});

app.post('/post', async (req: Request, res: Response) => {
  const { body, id }: PostByUser = req.body;

  await userService
    .createPost({ body, id })
    .then((createdPost: UserPost) => res.status(200).json({ createdPost }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ errMessage: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
