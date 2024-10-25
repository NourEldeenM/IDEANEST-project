import { NextFunction, Request, Response } from "express";
import accessService from "../services/accessService";
import { sendSuccess } from "../../utils/responses/responses";

async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const response = await accessService.createUserRecord(req.body);
		sendSuccess(req, res, { data: response }, 201);
	} catch (err) {
		next(err);
	}
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const data = await accessService.getAllUsersRecords();
		sendSuccess(req, res, data, 201);
	} catch (err) {
		next(err);
	}
}

async function validateUser(req: Request, res: Response, next: NextFunction) {
	try {
		const { accessToken, refreshToken } =
			await accessService.validateUserRecord(req.body);
		sendSuccess(req, res, { accessToken, refreshToken }, 201);
	} catch (err) {
		next(err);
	}
}

async function getRefreshToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const oldToken = req.body.refresh_token;
		const { accessToken, refreshToken } = accessService.getNewTokens(oldToken);
		sendSuccess(req, res, { accessToken, refreshToken });
	} catch (err) {
		next(err);
	}
}

export = { createUser, getAllUsers, validateUser, getRefreshToken };
