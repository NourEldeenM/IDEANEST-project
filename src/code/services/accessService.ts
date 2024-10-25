import { AppError } from "../../utils/error";
import config from "../config";
import bcrypt from "bcrypt";
import { connectMongoServer } from "../models/connection";
import jwt from "jsonwebtoken";

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

	await collection.insertOne(data);
	return `User created successfully`;
}

export async function getAllUsersRecords() {
	const { collection } = await connectMongoServer();
	const results = await collection.find().toArray();
	return results;
}

export async function validateUserRecord(data: userObj) {
	const { collection } = await connectMongoServer();
	const { email , password } = data;
	const record = await collection.findOne<userObj>({ email: email });
	if (!record) {
		throw AppError.notFound("User doesn't exist");
	}
	const correctPassword = await bcrypt.compare(password, record.password);
	if (!correctPassword)
		throw AppError.badRequest("Password or Email incorrect");
	return generateToken(record);
}

async function generateToken(record: userObj) {
	const accessToken = jwt.sign(
		{
			name: record.name,
			email: record.email,
		},
		config.ACCESS.hashSaltRounds,
		{
			expiresIn: "10m",
		},
	);
	const refreshToken = jwt.sign(
		{
			name: record.name,
			email: record.email,
		},
		config.ACCESS.hashSaltRounds,
		{ expiresIn: "1d" },
	);
	return { accessToken, refreshToken };
}
