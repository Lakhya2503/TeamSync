import { Router } from "express";
import { authLogin, authRegister } from "../controller/auth.controller.ts";

const router = Router();

router.route("/register").post(authRegister);

router.route("/login").post(authLogin);

export default router;
