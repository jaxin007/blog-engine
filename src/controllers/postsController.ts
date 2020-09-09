import { Response, Request, NextFunction } from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpPatch,
  request,
  queryParam,
  response,
  requestParam,
  requestBody, httpMethod,
} from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import { TYPES } from '../services/types';
import { AuthorizeServiceInterface, UserServiceInterface } from '../interfaces';
import {
  Comment,
  Post, User, UserPost,
} from '../models';
import { userSchema, validator } from '../services/user.validator';

@controller('/posts')
export class PostsController implements interfaces.Controller {
  @inject(TYPES.UserService) private userService: UserServiceInterface;

  @inject(TYPES.AuthService) private authService: AuthorizeServiceInterface;

  private async validateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;
    const isValidatedUser = await validator
      .validate(
        { name, email, password },
        userSchema,
      );

    if (isValidatedUser !== true) throw isValidatedUser[0];
    next();
  }

  @httpGet('/users')
  private async getAllUsers(req: Request, res: Response): Promise<Response> {
    const allUsers: User[] = await this.userService.getAllUsers();

    return res.status(200).json(allUsers);
  }

  @httpGet('/post/:id')
  private async getPostById(
    @requestParam('id') id: number, req: Request, res: Response,
  ): Promise<Response> {
    const postById: Post = await this.userService.getPostById(id);

    return res.status(200).json(postById);
  }

  @httpGet('/posts')
  private async getAllPosts(
    @queryParam('limit') limit: number,
    @queryParam('offset') offset: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const allPosts: Post[] = await this.userService.getAllPosts({ limit, offset });

    return res.status(200).json(allPosts);
  }

  @httpPost('/post')
  private async createPost(req: Request, res: Response): Promise<Response> {
    const { body, id }: Post = req.body;
    const newPost: UserPost = await this.userService.createPost({ body, id });

    return res.status(200).json(newPost);
  }

  @httpPost('/comment')
  private async createComment(req: Request, res: Response): Promise<Response> {
    const { body, id } = req.body;

    const createdComment: Comment = await this.userService.createComment(body, id);

    return res.status(200).json(createdComment);
  }

  @httpPatch('/like/:id')
  private async likeComment(
    @requestParam('id') id: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const likedPost = await this.userService.likePost(id);

    return res.status(200).json(likedPost);
  }

  @httpPatch('/dislike/:id')
  private async dislikeComment(
    @requestParam('id') id: number,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const dislikedPost = await this.userService.dislikePost(id);

    return res.status(200).json(dislikedPost);
  }
}
