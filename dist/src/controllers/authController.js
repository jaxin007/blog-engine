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
exports.AuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../services/types");
let AuthController = class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body;
            yield this.userService.registerUser({ name, email, password });
            const token = this.authService.generateAccessToken(this.config.JWT_SECRET_KEY);
            return res.status(200).json({ token });
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const token = yield this.authService.loginUser(userData);
            return res.status(200).json({ token });
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], AuthController.prototype, "userService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.AuthService),
    __metadata("design:type", Object)
], AuthController.prototype, "authService", void 0);
__decorate([
    inversify_1.inject(types_1.TYPES.EnvConfig),
    __metadata("design:type", Object)
], AuthController.prototype, "config", void 0);
__decorate([
    inversify_express_utils_1.httpPost('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    inversify_express_utils_1.httpPost('/signin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    inversify_express_utils_1.controller('/auth')
], AuthController);
exports.AuthController = AuthController;
