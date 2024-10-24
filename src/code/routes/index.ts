import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
	res.end("hello world");
});

export = router;