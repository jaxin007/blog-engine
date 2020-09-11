import { Response, Request } from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpPatch,
  queryParam,
  requestParam,
  requestBody,
  BaseHttpController,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import passport from 'passport';
import { TYPES } from '../services/types';
import { AuthorizeServiceInterface, UserServiceInterface } from '../interfaces';
import { Comment, Post, UserPost } from '../models';
import { EnvConfigInterface } from '../interfaces/EnvConfigInterface';

@controller('/posts', passport.authenticate('jwt', { session: false }))
export class PostsController extends BaseHttpController implements interfaces.Controller {
  @inject(TYPES.UserService) private userService: UserServiceInterface;

  @inject(TYPES.AuthService) private authService: AuthorizeServiceInterface;

  @inject(TYPES.EnvConfig) private config: EnvConfigInterface

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
  private async createPost(
    @requestBody() post: Post,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const { body, author } = post;

    const newPost: UserPost = await this.userService.createPost({ body, author });

    return res.status(200).json(newPost);
  }

  @httpPost('/comment')
  private async createComment(
    @requestBody() comment: Comment,
      req: Request,
      res: Response,
  ): Promise<Response> {
    const { body, id } = comment;

    const createdComment = await this.userService.createComment(body, id);

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
