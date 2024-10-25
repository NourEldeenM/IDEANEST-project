"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(req, res, data = {}, status = 200, message = "operation completed") {
    res.status(status).json({ message, data }).end();
}
function sendError(req, res, data = {}, status = 400, message = "operation failed") {
    res.status(status).json({ message, errors: data }).end();
}
