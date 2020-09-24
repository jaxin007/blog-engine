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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const passport_1 = __importDefault(require("passport"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../services/types");
const user_validator_1 = require("../services/user.validator");
let UsersController = class UsersController {
    validateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const isValidatedUser = yield user_validator_1.validator
                .validate({ name, email, password }, user_validator_1.userSchema);
            if (isValidatedUser !== true)
                throw isValidatedUser[0];
            next();
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.userService.getAllUsers();
            return res.status(200).json(allUsers);
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], UsersController.prototype, "userService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.AuthService),
    __metadata("design:type", Object)
], UsersController.prototype, "authService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.EnvConfig),
    __metadata("design:type", Object)
], UsersController.prototype, "config", void 0);
__decorate([
    inversify_express_utils_1.httpGet('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
UsersController = __decorate([
    inversify_express_utils_1.controller('/users', passport_1.default.authenticate('jwt', { session: false }))
], UsersController);
exports.UsersController = UsersController;
