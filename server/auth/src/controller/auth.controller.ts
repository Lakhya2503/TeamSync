import type { Request, Response } from "express";
import asyncHandler from "../config/asyncHandler.ts";
import ApiResponse from "../config/ApiResponse.ts";
import { fetchQuery } from "../helper/helper.ts";
import ApiError from "../config/ApiError.ts";

const generateAccessRefreshToken = async () => {};

const AuthRegister = asyncHandler(async (req: Request, res: Response) => {
  console.log("Req", req.body);

  const { username, first_name, last_name, email, password } = req.body;

  console.log({
    username,
    first_name,
    last_name,
    email,
    password,
  });

  const userExits = await fetchQuery("email", email);

  console.log("userExits", userExits);
  if (userExits) {
    throw new ApiError(400, `user with :${email} this email already exists`);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "user register successfully"));
});

export { AuthRegister };
