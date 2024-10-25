"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const accessController_1 = __importDefault(require("../controllers/accessController"));
const orgController_1 = __importDefault(require("../controllers/orgController"));
const authentication_1 = require("../../utils/authentication/authentication");
const router = express_1.default.Router();
router.route("/signup").post(accessController_1.default.createUser);
router.route("/signin").post(accessController_1.default.validateUser);
router.route("/refresh-token").post(accessController_1.default.getRefreshToken);
router
    .route("/organization")
    .post(authentication_1.authenticate, orgController_1.default.createOrg)
    .get(authentication_1.authenticate, orgController_1.default.getAllOrganizations);
router
    .route("/organization/:organization_id")
    .get(authentication_1.authenticate, orgController_1.default.getSingleOrganization)
    .put(authentication_1.authenticate, orgController_1.default.updateOrganization)
    .delete(authentication_1.authenticate, orgController_1.default.deleteOrganization);
module.exports = router;
