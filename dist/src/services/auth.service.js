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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
require("reflect-metadata");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const env_config_1 = require("../config/env-config");
const types_1 = require("./types");
let AuthService = AuthService_1 = class AuthService {
    static hashPassword(password, rounds) {
        return bcrypt_1.default.hashSync(password, rounds);
    }
    static comparePasswords(requestPassword, userPassword) {
        return bcrypt_1.default.compareSync(requestPassword, userPassword);
    }
    generateAccessToken(jwtSecretKey) {
        const accessToken = jsonwebtoken_1.default.sign({ payload: 'Authorized' }, jwtSecretKey);
        return accessToken;
    }
    loginUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            try {
                const userById = yield this.userService.getUserByData(email);
                const checkedUser = AuthService_1.comparePasswords(password, userById.password);
                if (!checkedUser) {
                    throw Error('Wrong password');
                }
                const token = this.generateAccessToken(env_config_1.config.JWT_SECRET_KEY);
                return token;
            }
            catch (e) {
                throw Error(e);
            }
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], AuthService.prototype, "userService", void 0);
AuthService = AuthService_1 = __decorate([
    inversify_1.injectable()
], AuthService);
exports.AuthService = AuthService;
