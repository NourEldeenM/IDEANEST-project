"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const responses_1 = require("../responses/responses");
function errorMiddleware(err, req, res, next) {
    (0, responses_1.sendError)(req, res, err.message, err.statusCode, err.errors);
}
