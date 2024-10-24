import { AppError } from ".";
import { NextFunction, Request, Response }  from "express";
import { sendError } from "../responses/responses";

export function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction) {
	sendError(req, res, err.message, err.statusCode, err.errors);
}
