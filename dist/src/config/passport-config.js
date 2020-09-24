"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const env_config_1 = require("./env-config");
const JwtStrategy = passport_jwt_1.default.Strategy;
const { ExtractJwt } = passport_jwt_1.default;
const JwtSecretKey = env_config_1.config.JWT_SECRET_KEY;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JwtSecretKey,
};
exports.jwtStrategy = new JwtStrategy(opts, (payload, next) => {
    next(null, payload);
});
