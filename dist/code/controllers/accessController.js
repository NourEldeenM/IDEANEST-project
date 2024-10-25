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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.validateUser = validateUser;
const accessService_1 = require("../services/accessService");
const responses_1 = require("../../utils/responses/responses");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield (0, accessService_1.createUserRecord)(req.body);
            (0, responses_1.sendSuccess)(req, res, message, 201);
        }
        catch (err) {
            next(err);
        }
    });
}
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, accessService_1.getAllUsersRecords)();
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
            const { accessToken, refreshToken } = yield (0, accessService_1.validateUserRecord)(req.body);
            (0, responses_1.sendSuccess)(req, res, { accessToken, refreshToken }, 201);
        }
        catch (err) {
            next(err);
        }
    });
}
