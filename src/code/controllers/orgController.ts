import { NextFunction, Request, Response } from "express";
import orgService from "../services/orgService";
import { sendSuccess } from "../../utils/responses/responses";

async function createOrg(req: Request, res: Response, next: NextFunction) {
	try {
		const orgId = await orgService.createNewOrganization(req.body);
		sendSuccess(req, res, { organization_id: orgId }, 201);
	} catch (err) {
		next(err);
	}
}

export = { createOrg };
