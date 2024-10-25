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

async function getAllOrganizations(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await orgService.getAllOrgs(); // response should look like: [{org1}, {org2}]
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
}

async function getSingleOrganization(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await orgService.getSingleOrg(req.params.organization_id);
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
}

async function updateOrganization(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await orgService.updateOrg(
			req.params.organization_id,
			req.body,
		);
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
}

async function deleteOrganization(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await orgService.deleteOrg(req.params.organization_id);
		sendSuccess(req, res);
	} catch (err) {
		next(err);
	}
}

async function sentInvitation(req: Request, res: Response, next: NextFunction) {
	try {
		await orgService.sendInvite(
			req.params.organization_id,
			req.token.email,
			req.body.user_email,
		);
		sendSuccess(
			req,
			res,
			{},
			200,
			`invitation sent successfully to ${req.body.user_email}`,
		);
	} catch (err) {
		next(err);
	}
}

export = {
	createOrg,
	getAllOrganizations,
	getSingleOrganization,
	updateOrganization,
	deleteOrganization,
	sentInvitation,
};
