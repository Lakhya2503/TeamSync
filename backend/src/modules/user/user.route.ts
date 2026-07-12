import { Router } from "express";
import { 
    currentUser,
    loginUser, 
    logoutUser, 
    registerUser, 
    updateUserProfile, 
    verifyEmail, 
    verifyEmailReuqest 
} from "./user.controller";
import { verifyJWT } from "../../middleware/verifyJwt";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(verifyJWT, logoutUser)

router.route("/update-profile").put(verifyJWT, updateUserProfile)

router.route("/verify-email/request").post(verifyEmailReuqest)

router.route("/:hashToken").get(verifyEmail)

router.route("/get-me").get(verifyEmail,currentUser)


export default router;