"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = void 0;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../error");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET_KEY = process.env.JWT_SECRET;
function authenticate(req, res, next) {
    const authHeader = req.header("Authorization") || req.header("authorization");
    if (!authHeader)
        throw error_1.AppError.unauthorized("unauthorized");
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (_a) {
        throw error_1.AppError.unauthorized("invalid token");
    }
}
