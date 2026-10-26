import { Router } from "express";
import { createTeam } from "./team.controller";
import { verifyJWT } from "../../middleware/verifyJwt";

const router = Router();

router.route("/create").post(verifyJWT, createTeam);

export default router;
