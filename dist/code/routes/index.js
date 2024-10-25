"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const accessController_1 = __importDefault(require("../controllers/accessController"));
const router = express_1.default.Router();
router.route("/signup").post(accessController_1.default.createUser);
router.route("/signin").post(accessController_1.default.validateUser);
router.route("/refresh-token").post(accessController_1.default.getRefreshToken);
module.exports = router;
