import { Request, Response } from "express";

export function sendSuccess(
	req: Request,
	res: Response,
	message: string = "operation completed",
	status: number = 200,
	data = {},
) {
	res.status(status).json({ message, data }).end();
}

export function sendError(
	req: Request,
	res: Response,
	message: string = "operation failed",
	status: number = 400,
	data = {},
) {
	res.status(status).json({ message, errors: data }).end();
}
