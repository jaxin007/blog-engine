"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const passport_1 = __importDefault(require("passport"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../services/types");
let PostsController = class PostsController extends inversify_express_utils_1.BaseHttpController {
    getPostById(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield this.userService.getPostById(id);
            return res.status(200).json(postById);
        });
    }
    getAllPosts(limit, offset, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield this.userService.getAllPosts({ limit, offset });
            return res.status(200).json(allPosts);
        });
    }
    createPost(post, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, author } = post;
            const newPost = yield this.userService.createPost({ body, author });
            return res.status(200).json(newPost);
        });
    }
    createComment(comment, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, id } = comment;
            const createdComment = yield this.userService.createComment(body, id);
            return res.status(200).json(createdComment);
        });
    }
    likeComment(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const likedPost = yield this.userService.likePost(id);
            return res.status(200).json(likedPost);
        });
    }
    dislikeComment(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dislikedPost = yield this.userService.dislikePost(id);
            return res.status(200).json(dislikedPost);
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], PostsController.prototype, "userService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.AuthService),
    __metadata("design:type", Object)
], PostsController.prototype, "authService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.EnvConfig),
    __metadata("design:type", Object)
], PostsController.prototype, "config", void 0);
__decorate([
    inversify_express_utils_1.httpGet('/post/:id'),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostById", null);
__decorate([
    inversify_express_utils_1.httpGet('/posts'),
    __param(0, inversify_express_utils_1.queryParam('limit')),
    __param(1, inversify_express_utils_1.queryParam('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    inversify_express_utils_1.httpPost('/post'),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    inversify_express_utils_1.httpPost('/comment'),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createComment", null);
__decorate([
    inversify_express_utils_1.httpPatch('/like/:id'),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likeComment", null);
__decorate([
    inversify_express_utils_1.httpPatch('/dislike/:id'),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "dislikeComment", null);
PostsController = __decorate([
    inversify_express_utils_1.controller('/posts', passport_1.default.authenticate('jwt', { session: false }))
], PostsController);
exports.PostsController = PostsController;
