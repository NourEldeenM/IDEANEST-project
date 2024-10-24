import { createApp } from "./app";
import { Express } from "express";

const app: Express = createApp();
let port: number = 3000;

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});

export = app;
