import { ObjectId } from "mongodb";
import { AppError } from "../../utils/error";
import config from "../config";
import { connectMongoServer } from "../models/connection";

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
	await collection.findOneAndDelete(
		{ _id: objectId },
	);
	return;
}

export = { createNewOrganization, getAllOrgs, getSingleOrg, updateOrg, deleteOrg };
