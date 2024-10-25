"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoServer = connectMongoServer;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
function connectMongoServer() {
    (0, mongoose_1.connect)(config_1.default.DATABASE.mongoDBUrl).then(() => {
        console.log("MongoDB connected successfully");
    });
}
