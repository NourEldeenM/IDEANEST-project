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
const error_1 = require("../../utils/error");
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = require("../models/connection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createHashedPass(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, +config_1.default.ACCESS.hashSaltRounds);
    });
}
function getMongoCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.connectMongoServer)();
        const collection = db.collection(collectionName);
        return collection;
    });
}
function createUserRecord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield getMongoCollection("users");
        data.password = yield createHashedPass(data.password);
        const existingUser = yield collection.findOne({
            $or: [{ email: data.email }, { username: data.name }],
        });
        if (existingUser) {
            throw error_1.AppError.conflict("Username or Email already in use");
        }
        yield collection.insertOne(data);
        return "user created successfully";
    });
}
function getAllUsersRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield getMongoCollection("users");
        const results = yield collection.find().toArray();
        return results;
    });
}
function generateToken(record) {
    const accessToken = jsonwebtoken_1.default.sign({
        name: record.name,
        email: record.email,
    }, config_1.default.ACCESS.jwt, {
        expiresIn: "10m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        name: record.name,
        email: record.email,
    }, config_1.default.ACCESS.jwt, { expiresIn: "1d" });
    return { accessToken, refreshToken };
}
function validateUserRecord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield getMongoCollection("users");
        const { email, password } = data;
        const record = yield collection.findOne({ email: email });
        if (!record) {
            throw error_1.AppError.notFound("User doesn't exist");
        }
        const correctPassword = yield bcrypt_1.default.compare(password, record.password);
        if (!correctPassword)
            throw error_1.AppError.badRequest("Password or Email incorrect");
        return generateToken(record);
    });
}
function getNewTokens(oldToken) {
    const decoded = jsonwebtoken_1.default.verify(oldToken, config_1.default.ACCESS.jwt);
    if (!decoded) {
        throw error_1.AppError.badRequest("Invalid refresh token");
    }
    return generateToken(decoded);
}
module.exports = {
    createUserRecord,
    getAllUsersRecords,
    validateUserRecord,
    getNewTokens,
};
