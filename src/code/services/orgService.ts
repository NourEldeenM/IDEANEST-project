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

const accessLevels = {
	OWNER: "OWNER",
	VISITOR: "VISITOR",
};

interface memberObj {
	name: string;
	email: string;
	access_level: string;
}

interface orgObj {
	name: string;
	description: string;
	organization_members: memberObj[];
}

async function getMongoCollection(collectionName: string) {
	const db = await connectMongoServer();
	const collection = db.collection(collectionName);
	return collection;
}

async function createNewOrganization(
	data: orgObj,
	name: string,
	email: string,
) {
	const collection = await getMongoCollection("organizations");
	data.organization_members = [];
	data.organization_members.push({
		name,
		email,
		access_level: accessLevels.OWNER,
	});
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

async function updateOrg(orgId: string, data: orgObj, userEmail: string) {
	const collection = await getMongoCollection("organizations");
	const objectId = new ObjectId(orgId);
	const organization = await collection.findOne({ _id: objectId });
	const owner = organization.organization_members.find(
		(user) => user.access_level == accessLevels.OWNER,
	);
	if (owner.email != userEmail)
		throw AppError.unauthorized("You cannot edit this organization");
	const record = await collection.findOneAndUpdate(
		{ _id: objectId },
		{ $set: data },
	);
	return record;
}

async function deleteOrg(orgId: string, userEmail: string) {
	const collection = await getMongoCollection("organizations");
	const objectId = new ObjectId(orgId);
	const organization = await collection.findOne({ _id: objectId });
	const owner = organization.organization_members.find(
		(user) => user.access_level == accessLevels.OWNER,
	);
	if (owner.email != userEmail)
		throw AppError.unauthorized("You cannot delete this organization");
	await collection.findOneAndDelete({ _id: objectId });
	return;
}

async function addVisitorToOrganization(orgId: string, receiverEmail: string) {
	const collection = await getMongoCollection("organizations");
	await collection.findOneAndUpdate(
		{ _id: new ObjectId(orgId) },
		{
			$push: {
				organization_members: {
					email: receiverEmail,
					access_level: accessLevels.VISITOR,
				},
			},
		},
	);
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

	addVisitorToOrganization(orgId, receiverEmail);
}

export = {
	createNewOrganization,
	getAllOrgs,
	getSingleOrg,
	updateOrg,
	deleteOrg,
	sendInvite,
};
