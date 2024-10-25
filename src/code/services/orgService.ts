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

export = { createNewOrganization };
