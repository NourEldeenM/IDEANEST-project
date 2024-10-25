import { createApp } from "./app";
import { Express } from "express";
import config from './code/config/index';

const app: Express = createApp();
let port: string | number = config.SERVER.localPort;

app.listen(+port, () => {
	console.log(`listening on http://localhost:${port}`);
});

export = app;
