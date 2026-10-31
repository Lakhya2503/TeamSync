import type { Request, Response } from "express";
import asyncHandler from "../config/asyncHandler.ts";
import ApiResponse from "../config/ApiResponse.ts";
import { databasePassword, fetchQuery } from "../helper/helper.ts";
import ApiError from "../config/ApiError.ts";
import database from "../db/index.ts";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../config/token.ts";

const options: {
  httpOnly: boolean;
  secure: boolean;
} = {
  httpOnly: true,
  secure: true,
};

const generateAccessRefreshToken = async (user: {
  email: string;
  username: string;
  id: number;
}) => {
  console.log("USER", user);

  const refreshToken = await createRefreshToken(user.id);
  const accessToken = createAccessToken(user);

  console.log("RefreshToken", refreshToken);
  console.log("AccessToken", accessToken);

  return {
    refreshToken,
    accessToken,
  };
};

const authRegister = asyncHandler(async (req: Request, res: Response) => {
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

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashpassword", hashPassword);

  const user = await database.query(
    `INSERT INTO users(username,first_name,last_name,email,password) VALUES($1,$2,$3,$4,$5)
      RETURNING * `,
    [username, first_name, last_name, email, hashPassword],
  );

  const _user = user.rows[0];

  return res
    .status(201)
    .json(new ApiResponse(201, { _user }, "user register successfully"));
});

const authLogin = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  let user;
  if (req.body?.username) {
    user = await fetchQuery("username", username);
    console.log("USER USERNAME : ", user);
  } else if (req.body?.email) {
    user = await fetchQuery("email", email);
    console.log("USER EMAIL : ", user);
  }

  const hashedPassword = await databasePassword(user.id);
  const isPasswordCorrect = await bcrypt.compare(
    password,
    hashedPassword.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "invalid credentials");
  }

  if (!user) {
    throw new ApiError(401, "user not found");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user);

  return res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {}, "Login successfully"));
});

const authLogout = asyncHandler(async (req: Request, res: Response) => {

  


  return res
    .status(200)
    .cookie("accessToken", "", options)
    .cookie("refreshToken", "", options)
    .json(new ApiResponse(200, {}, "User loggedout successfully"));
});

export { authRegister, authLogin };
