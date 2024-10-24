import express, { Express } from "express";
import router from "./code/routes";
import { errorMiddleware } from "./utils/error/errorMiddleware";

const port = process.env.PORT ?? 3000;

export function createApp(): Express {
	const app = express();
	app.use(express.json());
	app.use("/", router);
	app.use(errorMiddleware);
	return app;
}
