import express, { Router } from "express";
import accessController from "../controllers/accessController";

const router: Router = express.Router();

router.route("/signup").post(accessController.createUser);
router.route("/signin").post(accessController.validateUser);
router.route("/refresh-token").post(accessController.getRefreshToken);

// router.route("/organization").post().get();
// router.route("/organization/{organization_id}").get().put().delete();

export = router;
