import { NextFunction, Request, Response } from "express";
import { createUserRecord } from "../services/accessService";
import { sendSuccess } from "../../utils/responses/responses";

export async function createUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const message = await createUserRecord(req.body);
		sendSuccess(req, res, message, 201);
	} catch (err) {
		next(err);
	}
}
