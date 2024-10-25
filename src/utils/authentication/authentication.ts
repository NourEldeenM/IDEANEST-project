import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { AppError } from "../error";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET as Secret;

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization") || req.header("authorization");
	if (!authHeader) throw AppError.unauthorized("unauthorized");
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		(req as CustomRequest).token = decoded;
		next();
	} catch {
		throw AppError.unauthorized("invalid token");
	}
}
