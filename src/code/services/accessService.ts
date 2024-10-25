import User from "../models/userModel";

interface userObj {
	name: string;
	email: string;
	password: string;
}

export async function createUserRecord(data: userObj) {
	const newUser = new User(data);
	await newUser.save();
	console.log(newUser);
	return `User ${data.name} created successfully`;
}
