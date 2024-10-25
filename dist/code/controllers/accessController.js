"use strict";
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
const accessService_1 = __importDefault(require("../services/accessService"));
const responses_1 = require("../../utils/responses/responses");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield accessService_1.default.createUserRecord(req.body);
            (0, responses_1.sendSuccess)(req, res, { data: response }, 201);
        }
        catch (err) {
            next(err);
        }
    });
}
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield accessService_1.default.getAllUsersRecords();
            (0, responses_1.sendSuccess)(req, res, data, 201);
        }
        catch (err) {
            next(err);
        }
    });
}
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = yield accessService_1.default.validateUserRecord(req.body);
            (0, responses_1.sendSuccess)(req, res, { accessToken, refreshToken }, 201);
        }
        catch (err) {
            next(err);
        }
    });
}
function getRefreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldToken = req.body.refresh_token;
            const { accessToken, refreshToken } = accessService_1.default.getNewTokens(oldToken);
            (0, responses_1.sendSuccess)(req, res, { accessToken, refreshToken });
        }
        catch (err) {
            next(err);
        }
    });
}
module.exports = { createUser, getAllUsers, validateUser, getRefreshToken };
