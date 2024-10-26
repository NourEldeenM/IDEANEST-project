import { NextFunction, Request, Response } from "express";
import orgService from "../services/orgService";
import { sendSuccess } from "../../utils/responses/responses";
import { CustomRequest } from "../../utils/authentication/authentication";

async function createOrg(
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const orgId = await orgService.createNewOrganization(
			req.body,
			req.token.name,
			req.token.email,
		);
		res.status(201).json({organization_id: orgId}).end();
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
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email } = req.token;

		const data = await orgService.updateOrg(
			req.params.organization_id,
			req.body,
			email
		);
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
}

async function deleteOrganization(
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const data = await orgService.deleteOrg(req.params.organization_id, req.token.email);
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
