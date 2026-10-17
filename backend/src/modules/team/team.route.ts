import { Router } from "express";
import { createTeam } from "./team.controller.js";

const router = Router()


router.route(
  '/team/create'
).post(
  createTeam
)


export default router