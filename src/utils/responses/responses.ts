import { Request, Response } from "express";

export function sendSuccess(
	req: Request,
	res: Response,
	data = {},
	status: number = 200,
	message: string = "operation completed",
) {
	res.status(status).json({ message, ...data }).end();
}

export function sendError(
	req: Request,
	res: Response,
	data = {},
	status: number = 400,
	message: string = "operation failed",
) {
	res.status(status).json({ message, errors: data }).end();
}
