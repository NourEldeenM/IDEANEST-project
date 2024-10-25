import { MongoClient, Db, Collection } from "mongodb";
import config from "../config";

const client: MongoClient = new MongoClient(config.DATABASE.mongoDBUrl);
const dbName: string = "ideanest";
let db: Db | null = null;
let collection: Collection | null = null;

export async function connectMongoServer() {
	if (!db || !collection) {
		await client.connect();
		console.log("MongoDB connected successfully");
		db = client.db(dbName);
		collection = db.collection("user");
	}
	return { db, collection };
}
