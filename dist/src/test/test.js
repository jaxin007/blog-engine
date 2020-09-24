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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const inversify_express_utils_1 = require("inversify-express-utils");
const test_service_1 = __importDefault(require("./test.service"));
const knex_config_1 = require("../config/knex-config");
const auth_service_1 = require("../services/auth.service");
const knexCleaner_1 = __importDefault(require("./knexCleaner"));
const knexCleaner = new knexCleaner_1.default(knex_config_1.knexConfig);
const user = {
    name: 'Kirill',
    email: 'test@gmail.com',
    password: 'testPassword',
};
const post = {
    author: 1,
    body: 'test post text',
};
const comment = {
    id: 1,
    body: 'test comment',
};
chai_1.default.use(chai_http_1.default);
mocha_1.describe('AuthService', () => {
    const userPassword = 'someText';
    mocha_1.it('should hash password', (done) => {
        const hash = auth_service_1.AuthService.hashPassword(userPassword, 1);
        chai_1.expect(hash).to.be.a('string');
        done();
    });
    mocha_1.it('should compare passwords', (done) => {
        const hash = auth_service_1.AuthService.hashPassword(userPassword, 1);
        const comparedPasswords = auth_service_1.AuthService.comparePasswords(userPassword, hash);
        chai_1.expect(comparedPasswords).to.be.a('boolean');
        done();
    });
});
mocha_1.describe('/auth', () => {
    beforeEach((done) => {
        knexCleaner.cleanDB()
            .then(() => {
            inversify_express_utils_1.cleanUpMetadata();
            return done();
        });
    });
    mocha_1.it('POST /signup: should register new user in DB & return token', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield test_service_1.default.createNewUser(user);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('POST /signin: should login user & return token', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield test_service_1.default.createNewUser(user);
            yield test_service_1.default.loginUser(user);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('try to post something with with non-exists user data & should return status 401 (Unauthorized)', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield test_service_1.default.checkAuthorization();
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
});
mocha_1.describe('/posts', () => {
    beforeEach((done) => {
        knexCleaner.cleanDB()
            .then(() => {
            inversify_express_utils_1.cleanUpMetadata();
            return done();
        });
    });
    mocha_1.it('POST /post: should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield test_service_1.default.createNewUser(user);
            const { token } = newUser.body;
            yield test_service_1.default.createNewPost(post, token);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('GET /posts: should get list of posts', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield test_service_1.default.createNewUser(user);
            const { token } = newUser.body;
            yield test_service_1.default.getPostsList(token);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('POST /comment: should create a new comment', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield test_service_1.default.createNewUser(user);
            const { token } = newUser.body;
            yield test_service_1.default.createNewPost(post, token);
            yield test_service_1.default.createNewComment(comment, token);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('PATCH /like/:id should like a post', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield test_service_1.default.createNewUser(user);
            const { token } = newUser.body;
            yield test_service_1.default.createNewPost(post, token);
            yield test_service_1.default.likePost(token);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
    mocha_1.it('PATCH /dislike/:id should dislike a post', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield test_service_1.default.createNewUser(user);
            const { token } = newUser.body;
            yield test_service_1.default.createNewPost(post, token);
            yield test_service_1.default.dislikePost(token);
        }
        catch (err) {
            console.error(err.stack);
        }
    }));
});
