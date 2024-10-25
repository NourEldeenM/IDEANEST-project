import { connect } from "mongoose";
import config from "../config";

export function connectMongoServer() {
	connect(config.DATABASE.mongoDBUrl).then(() => {
		console.log("MongoDB connected successfully");
	});
}
