import { NextFunction, Request, Response } from 'express';
import {
  Comment, NewUser, Post, SearchParams, User, UserPost,
} from '../models';
import { userService } from '../services';
import { AuthService } from '../services/auth.service';
import { config } from '../config/env-config';
import { userSchema, validator } from '../services/user.validator';

export class Controllers {
  static async validateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;

    const isValidatedUser = await validator
      .validate(
        { name, email, password },
        userSchema,
      );

    if (isValidatedUser !== true) throw isValidatedUser[0];
    next();
  }

  static async signInHandler(req: Request, res: Response): Promise<Response> {
    const userData: User = req.body;

    const token = await AuthService.loginUser(userData);

    return res.status(200).json({ token });
  }

  static async signUpHandler(req: Request, res: Response): Promise<Response> {
    const { email, name, password }: NewUser = req.body;

    await userService.registerUser({ name, email, password });

    const token = AuthService.generateAccessToken(config.JWT_SECRET_KEY);

    return res.status(200).json({ token });
  }

  static async getAllUsersHandler(req: Request, res: Response): Promise<Response> {
    const allUsers: User[] = await userService.getAllUsers();

    return res.status(200).json(allUsers);
  }

  static async getPostByIdHandler(req: Request, res: Response): Promise<Response> {
    const postId: number = +req.params.id;
    const postById: Post = await userService.getPostById(postId);

    return res.status(200).json(postById);
  }

  static async getAllPostsHandler(req: Request, res: Response): Promise<Response> {
    const { limit, offset } = req.query;

    const allPosts: Post[] = await userService.getAllPosts({ limit, offset } as SearchParams);

    return res.status(200).json(allPosts);
  }

  static async createPostHandler(req: Request, res: Response): Promise<Response> {
    const { body, id }: Post = req.body;
    const newPost: UserPost = await userService.createPost({ body, id });

    return res.status(200).json(newPost);
  }

  static async createCommentHandler(req: Request, res: Response): Promise<Response> {
    const { body, id } = req.body;

    const createdComment: Comment = await userService.createComment(body, id);

    return res.status(200).json(createdComment);
  }

  static async likePostHandler(req: Request, res: Response): Promise<Response> {
    const id: number = +req.params.id;

    const likedPost = await userService.likePost(id);

    return res.status(200).json(likedPost);
  }

  static async dislikePostHandler(req: Request, res: Response): Promise<Response> {
    const id: number = +req.params.id;

    const dislikedPost = await userService.dislikePost(id);

    return res.status(200).json(dislikedPost);
  }

  static async errorHandler(
    err: Error, req: Request, res: Response, next: NextFunction,
  ): Promise<Response> {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
}
