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

async function getMongoCollection(collectionName: string) {
	const db = await connectMongoServer();
	const collection = db.collection(collectionName);
	return collection;
}

async function createUserRecord(data: userObj) {
	const collection = await getMongoCollection("users");

	data.password = await createHashedPass(data.password);

	const existingUser = await collection.findOne({
		$or: [{ email: data.email }, { username: data.name }],
	});

	if (existingUser) {
		throw AppError.conflict("Username or Email already in use");
	}

	await collection.insertOne(data);
	return "user created successfully";
}

async function getAllUsersRecords() {
	const collection = await getMongoCollection("users");
	const results = await collection.find().toArray();
	return results;
}

function generateToken(record: userObj) {
	const accessToken = jwt.sign(
		{
			name: record.name,
			email: record.email,
		},
		config.ACCESS.jwt,
		{
			expiresIn: "10m",
		},
	);
	const refreshToken = jwt.sign(
		{
			name: record.name,
			email: record.email,
		},
		config.ACCESS.jwt,
		{ expiresIn: "1d" },
	);
	return { accessToken, refreshToken };
}

async function validateUserRecord(data: userObj) {
	const collection = await getMongoCollection("users");
	const { email, password } = data;
	const record = await collection.findOne<userObj>({ email: email });
	if (!record) {
		throw AppError.notFound("User doesn't exist");
	}
	const correctPassword = await bcrypt.compare(password, record.password);
	if (!correctPassword)
		throw AppError.badRequest("Password or Email incorrect");
	return generateToken(record);
}

function getNewTokens(oldToken: string) {
	const decoded = jwt.verify(oldToken, config.ACCESS.jwt);
	if (!decoded) {
		throw AppError.badRequest("Invalid refresh token");
	}
	return generateToken(decoded);
}

export = {
	createUserRecord,
	getAllUsersRecords,
	validateUserRecord,
	getNewTokens,
};
