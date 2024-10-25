import express, { Router } from "express";
import { createUser, getAllUsers, validateUser } from "../controllers/accessController";

const router: Router = express.Router();

router.route("/signup").post(createUser);
router.route('/').get(getAllUsers);
router.route("/signin").post(validateUser);
// router.route("/refresh-token").post();

// router.route("/organization").post().get();
// router.route("/organization/{organization_id}").get().put().delete();

export = router;
