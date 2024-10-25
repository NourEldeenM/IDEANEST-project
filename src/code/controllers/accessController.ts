import { NextFunction, Request, Response } from "express";
import {
	createUserRecord,
	getAllUsersRecords,
	validateUserRecord
} from "../services/accessService";
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

export async function getAllUsers(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await getAllUsersRecords();
		sendSuccess(req, res, data, 201);
	} catch (err) {
		next(err);
	}
}

export async function validateUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const {accessToken, refreshToken} = await validateUserRecord(req.body);
		sendSuccess(req, res, {accessToken, refreshToken} , 201);
	} catch (err) {
		next(err);
	}
}
