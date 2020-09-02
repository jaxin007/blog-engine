import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userService } from './services';
import { PostByUser } from './models';

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
  const allUsers = await userService.getAllUsers();
  res.status(200).json({ allUsers });
});

app.get('/post/:id', async (req: Request, res: Response) => {
  const userId : number = +req.params.id;

  await userService
    .getPostById(userId)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err.details));
});

app.post('/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  await userService
    .registerUser({ name, email, password })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json(err.detail));
});

app.post('/post', async (req: Request, res: Response) => {
  const { body, id }: PostByUser = req.body;

  const createdPost = await userService.createPost({ body, id });

  return res.status(200).json({ createdPost });
});

app.listen(port, () => {
  console.log(`Server listened on port ${port}`);
});
