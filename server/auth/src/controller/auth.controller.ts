import type { Request, Response } from "express";
import asyncHandler from "../config/asyncHandler.ts";
import ApiResponse from "../config/ApiResponse.ts";

const AuthRegister = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

    

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "user register successfully"));
});

export { AuthRegister };
