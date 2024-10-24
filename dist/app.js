"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./code/routes"));
const errorMiddleware_1 = require("./utils/error/errorMiddleware");
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/", routes_1.default);
    app.use(errorMiddleware_1.errorMiddleware);
    return app;
}