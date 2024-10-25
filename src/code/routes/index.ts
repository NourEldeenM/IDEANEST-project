import express, { Router } from "express";
import accessController from "../controllers/accessController";
import orgController from "../controllers/orgController";
import { authenticate } from "../../utils/authentication/authentication";

const router: Router = express.Router();

router.route("/signup").post(accessController.createUser);
router.route("/signin").post(accessController.validateUser);
router.route("/refresh-token").post(accessController.getRefreshToken);

router
	.route("/organization")
	.post(authenticate, orgController.createOrg)
	.get(authenticate, orgController.getAllOrganizations);

router
	.route("/organization/:organization_id")
	.get(authenticate, orgController.getSingleOrganization)
	.put(authenticate, orgController.updateOrganization)
    .delete(authenticate, orgController.deleteOrganization);

export = router;
