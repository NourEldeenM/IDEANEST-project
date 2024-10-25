import { AppError } from "../../utils/error";
import config from "../config";
import bcrypt from "bcrypt";
import { connectMongoServer } from "../models/connection";

interface userObj {
	name: string;
	email: string;
	password: string;
}

async function createHashedPass(password: string) {
	return await bcrypt.hash(password, +config.ACCESS.hashSaltRounds);
}

export async function createUserRecord(data: userObj) {
	const { collection } = await connectMongoServer();

	data.password = await createHashedPass(data.password);

	const existingUser = await collection.findOne({
		$or: [{ email: data.email }, { username: data.name }],
	});

	if (existingUser) {
		throw AppError.conflict("Username or Email already in use");
	}

	const result = await collection.insertOne(data);
	return `User created successfully`;
}

export async function getAllUsersRecords() {
	const { collection } = await connectMongoServer();
	const results = await collection.find().toArray();
	return results;
}
