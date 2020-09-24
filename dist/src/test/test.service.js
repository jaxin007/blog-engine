"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = __importStar(require("chai"));
const index_1 = require("../index");
class TestService {
    static createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield chai_1.default.request(index_1.app)
                .post('/auth/signup')
                .send(user);
            chai_1.expect(newUser).status(200);
            chai_1.expect(newUser.body).to.have.property('token');
            return newUser;
        });
    }
    static loginUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizedUser = yield chai_1.default.request(index_1.app)
                .post('/auth/signin')
                .send(user);
            chai_1.expect(authorizedUser).status(200);
            chai_1.expect(authorizedUser.body).to.have.property('token');
            return authorizedUser;
        });
    }
    static checkAuthorization() {
        return __awaiter(this, void 0, void 0, function* () {
            const unauthorizedRequest = yield chai_1.default.request(index_1.app)
                .get('/users/users');
            chai_1.expect(unauthorizedRequest).status(401);
            return unauthorizedRequest;
        });
    }
    static createNewPost(post, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield chai_1.default.request(index_1.app)
                .post('/posts/post')
                .send(post)
                .set('authorization', `Bearer ${token}`);
            const { body } = newPost;
            chai_1.expect(newPost).status(200);
            chai_1.expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);
            chai_1.expect(newPost).to.be.a('object');
            return newPost;
        });
    }
    static getPostsList(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsList = yield chai_1.default.request(index_1.app)
                .get('/posts/posts?limit=1&offset=1')
                .set('authorization', `Bearer ${token}`);
            chai_1.expect(postsList).status(200);
            chai_1.expect(postsList).to.be.a('object');
            return postsList;
        });
    }
    static createNewComment(comment, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = yield chai_1.default.request(index_1.app)
                .post('/posts/comment')
                .send(comment)
                .set('authorization', `Bearer ${token}`);
            const { body } = newComment;
            chai_1.expect(newComment).status(200);
            chai_1.expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);
            chai_1.expect(newComment).to.be.a('object');
            return newComment;
        });
    }
    static likePost(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const likedPost = yield chai_1.default.request(index_1.app)
                .patch('/posts/like/1')
                .set('authorization', `Bearer ${token}`);
            const { body } = likedPost;
            chai_1.expect(likedPost).status(200);
            chai_1.expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);
            chai_1.expect(likedPost).to.be.a('object');
            return likedPost;
        });
    }
    static dislikePost(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const dislikedPost = yield chai_1.default.request(index_1.app)
                .patch('/posts/dislike/1')
                .set('authorization', `Bearer ${token}`);
            const { body } = dislikedPost;
            chai_1.expect(dislikedPost).status(200);
            chai_1.expect(body).that.includes.all.keys(['id', 'body', 'author', 'created_at', 'comment', 'likes']);
            chai_1.expect(dislikedPost).to.be.a('object');
            return dislikedPost;
        });
    }
}
exports.default = TestService;
