"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(req, res, message = "operation completed", status = 200, data = {}) {
    res.status(status).json({ message, data }).end();
}
function sendError(req, res, message = "operation failed", status = 400, data = {}) {
    res.status(status).json({ message, errors: data }).end();
}
