import { Router } from "express";
import { AuthRegister } from "../controller/auth.controller.ts";

const router = Router();

router.route("/register").post(AuthRegister);

export default router;
