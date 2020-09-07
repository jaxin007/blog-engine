import { NextFunction, Request, Response } from 'express';
import {
  Comment, NewUser, Post, SearchParams, User, UserPost,
} from '../models';
import { authService, userService } from '../services';

type ResponsePromise = Promise<Response>;

export class AppHandler {
  async signInHandler(req: Request, res: Response): ResponsePromise {
    const userData: User = req.body;

    const token = await authService.loginUser(userData);

    return res.status(200).json({ token });
  }

  async signUpHandler(req: Request, res: Response): ResponsePromise {
    const { email, name, password }: NewUser = req.body;

    await userService.registerUser({ name, email, password });

    const token = authService.generateAccessToken();

    return res.status(200).json({ token });
  }

  async getAllUsersHandler(req: Request, res: Response): ResponsePromise {
    const allUsers: User[] = await userService.getAllUsers();

    return res.status(200).json(allUsers);
  }

  async getPostByIdHandler(req: Request, res: Response): ResponsePromise {
    const postId : number = +req.params.id;
    const postById: Post = await userService.getPostById(postId);

    return res.status(200).json(postById);
  }

  async getAllPostsHandler(req: Request, res: Response): ResponsePromise {
    const { limit, offset } = req.query;

    const allPosts: Post[] = await userService.getAllPosts({ limit, offset } as SearchParams);

    return res.status(200).json(allPosts);
  }

  async createPostHandler(req: Request, res: Response): ResponsePromise {
    const { body, id }: Post = req.body;
    const newPost: UserPost = await userService.createPost({ body, id });

    return res.status(200).json(newPost);
  }

  async createCommentHandler(req: Request, res: Response): ResponsePromise {
    const { body, id } = req.body;

    const createdComment: Comment = await userService.createComment(body, id);

    return res.status(200).json(createdComment);
  }

  async likePostHandler(req: Request, res: Response): ResponsePromise {
    const id: number = +req.params.id;

    const likedPost = await userService.likePost(id);

    return res.status(200).json(likedPost);
  }

  async dislikePostHandler(req: Request, res: Response): ResponsePromise {
    const id: number = +req.params.id;

    const dislikedPost = await userService.dislikePost(id);

    return res.status(200).json(dislikedPost);
  }

  async errorHandler(err: Error, req: Request, res: Response, next: NextFunction): ResponsePromise {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
}
