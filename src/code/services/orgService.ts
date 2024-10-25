import { ObjectId } from "mongodb";
import { AppError } from "../../utils/error";
import { connectMongoServer } from "../models/connection";
require("dotenv").config();

// Mail sending setup
import { MailtrapClient } from "mailtrap";
const MAIL_TOKEN = process.env.MAIL_TOKEN;
const client = new MailtrapClient({
	token: MAIL_TOKEN,
});

interface memberObj {
	name: string;
	email: string;
	access_level: string;
}

interface orgObj {
	name: string;
	description: string;
	organization_members: [memberObj];
}

async function getMongoCollection(collectionName: string) {
	const db = await connectMongoServer();
	const collection = db.collection(collectionName);
	return collection;
}

async function createNewOrganization(data: orgObj) {
	const collection = await getMongoCollection("organizations");
	const record = await collection.insertOne(data);
	return record.insertedId;
}

async function getAllOrgs() {
	const collection = await getMongoCollection("organizations");
	const records = await collection.find({}).toArray();
	return records;
}

async function getSingleOrg(orgId: string) {
	const collection = await getMongoCollection("organizations");
	const objectId = new ObjectId(orgId);
	const record = await collection.findOne({ _id: objectId });
	if (!record)
		throw AppError.notFound(`Organization with ID ${orgId} doesn't exits`);
	return record;
}

async function updateOrg(orgId: string, data: orgObj) {
	const collection = await getMongoCollection("organizations");
	const objectId = new ObjectId(orgId);
	const record = await collection.findOneAndUpdate(
		{ _id: objectId },
		{ $set: data },
	);
	return record;
}

async function deleteOrg(orgId: string) {
	const collection = await getMongoCollection("organizations");
	const objectId = new ObjectId(orgId);
	await collection.findOneAndDelete({ _id: objectId });
	return;
}

async function sendInvite(
	orgId: string,
	senderEmail: string,
	receiverEmail: string,
) {
	const record = await getSingleOrg(orgId);
	if (!record)
		throw AppError.notFound(`Organization with id ${orgId} doesn't exist`);

	const sender = {
		email: "hello@demomailtrap.com", // this should be changed to authenticated user email
		name: "Organization invitation",
	};
	const recipients = [
		{
			email: receiverEmail,
		},
	];

	await client.send({
		from: sender,
		to: recipients,
		subject: "TEST invitation from nodejs!",
		text: `Congrats you are invited to join our organization \"${record.name}\" with for sending test email with Mailtrap!`,
		category: "Mail Test",
	});
}

export = {
	createNewOrganization,
	getAllOrgs,
	getSingleOrg,
	updateOrg,
	deleteOrg,
	sendInvite,
};
