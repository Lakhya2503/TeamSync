import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUserProfile } from "./user.controller";
import { verifyJWT } from "../../middleware/verifyJwt";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(verifyJWT, logoutUser)

router.route("/update-profile").put(verifyJWT, updateUserProfile)


export default router;