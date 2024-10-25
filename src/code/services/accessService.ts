import { AppError } from "../../utils/error";
import config from "../config";
import User from "../models/userModel";
import bcrypt from "bcrypt";

interface userObj {
	name: string;
	email: string;
	password: string;
}

async function createHashedPass(password: string) {
	return await bcrypt.hash(password, +config.ACCESS.hashSaltRounds);
}

export async function createUserRecord(data: userObj) {
	data.password = await createHashedPass(data.password);
	const existingUser = await User.findOne({
		$or: [{ email: data.email }, { username: data.name }],
	});

	if (existingUser) {
		throw AppError.conflict("Username or Email already in use");
	}
	const newUser = new User(data);
	await newUser.save();
	return `User ${data.name} created successfully`;
}
