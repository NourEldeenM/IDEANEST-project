"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(name, message, statusCode, errors) {
        super(message);
        this.name = name !== null && name !== void 0 ? name : "Application Error";
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors !== null && errors !== void 0 ? errors : undefined;
    }
    static notFound(message) {
        return new AppError("NotFoundError", message, 404);
    }
    static badRequest(message, errors) {
        return new AppError("BadRequestError", message, 400, errors);
    }
    static unauthorized(message) {
        return new AppError("UnauthorizedError", message, 401);
    }
    static conflict(message) {
        return new AppError("ConflictError", message, 409);
    }
    static internalServer(message) {
        return new AppError("InternalServerError", message, 500);
    }
}
exports.AppError = AppError;
