"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.validator = void 0;
const fastest_validator_1 = __importDefault(require("fastest-validator"));
exports.validator = new fastest_validator_1.default();
exports.userSchema = {
    email: {
        type: 'email', min: 3, max: 100,
    },
    name: {
        type: 'string', min: 3, max: 100, optional: true,
    },
    password: {
        type: 'string', min: 3, max: 100,
    },
};
