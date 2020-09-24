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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const auth_service_1 = require("./auth.service");
let UserService = class UserService {
    getUserByData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userById = yield this.postgresService
                .knex('users')
                .where('email', email)
                .returning('*');
            return userById[0];
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = user;
            const hashedPassword = yield auth_service_1.AuthService.hashPassword(password, 1);
            const newUser = yield this
                .postgresService
                .knex('users')
                .insert({ email, name, password: hashedPassword })
                .returning('*');
            return newUser[0];
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.postgresService
                .knex('users')
                .select(['id', 'name', 'email'])
                .returning('*');
            return allUsers;
        });
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, author } = post;
            const createdPost = yield this.postgresService
                .knex('posts')
                .insert({ body, author })
                .returning('*');
            return createdPost[0];
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield this.postgresService
                .knex('posts')
                .where('id', id)
                .first()
                .returning('*');
            return postById[0];
        });
    }
    getAllPosts(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsResponse = yield this.postgresService
                .knex('posts')
                .orderBy('id')
                .limit(+searchParams.limit)
                .offset(+searchParams.offset);
            return postsResponse;
        });
    }
    createComment(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdComment = yield this.postgresService
                .knex('posts')
                .where('id', id)
                .update({ body })
                .returning('*');
            return createdComment[0];
        });
    }
    likePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const likedPost = yield this.postgresService
                .knex('posts')
                .where('id', id)
                .increment('likes')
                .returning('*');
            return likedPost[0];
        });
    }
    dislikePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dislikedPost = yield this.postgresService
                .knex('posts')
                .where('id', id)
                .decrement('likes')
                .returning('*');
            return dislikedPost[0];
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.PostgresService),
    __metadata("design:type", Object)
], UserService.prototype, "postgresService", void 0);
UserService = __decorate([
    inversify_1.injectable()
], UserService);
exports.UserService = UserService;
