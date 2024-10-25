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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRecord = createUserRecord;
const error_1 = require("../../utils/error");
const config_1 = __importDefault(require("../config"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createHashedPass(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, +config_1.default.ACCESS.hashSaltRounds);
    });
}
function createUserRecord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.password = yield createHashedPass(data.password);
        const existingUser = yield userModel_1.default.findOne({
            $or: [{ email: data.email }, { username: data.name }],
        });
        if (existingUser) {
            throw error_1.AppError.conflict("Username or Email already in use");
        }
        const newUser = new userModel_1.default(data);
        yield newUser.save();
        console.log(newUser);
        return `User ${data.name} created successfully`;
    });
}
