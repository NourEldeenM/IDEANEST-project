import express, { Express } from "express";
import router from "./code/routes/index";
import { errorMiddleware } from "./utils/error/errorMiddleware";
import { connectMongoServer } from "./code/models/connection";

const port = process.env.PORT ?? 3000;

export function createApp(): Express {
	const app = express();
	connectMongoServer();
	app.use(express.json());
	app.use("/", router);
	app.use(errorMiddleware);
	return app;
}
