import { database } from "../../config/db";
import { ENV } from "../../config/ENV";
import { fetchUser, requiredFiled } from "../../helper/user.helper";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  temporaryTokenGenerater,
} from "../../config/token";
import { USER_TYPE } from "./user.type";
import { getOtp, setOtp } from "../../redis/cache";
import { otpGenerator } from "../../helper/comman";
import crypto from "crypto";
import { userType } from "./user.interface";
import { Request, Response } from "express";

const options = {
  httpOnly: true,
  secure: true,
};

export const generateAccessRefreshToken = async (user: userType) => {
  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  await database.query(
    "UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING refreshToken ",
    [refreshToken, user.id]
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<{}> => {
    const { name , email, password, secretKey } = req.body;

    requiredFiled([name, email, password]);

    const userExists = await database.query(
      "SELECT * FROM users WHERE email = $1 ",
      [email]
    );

    const _userExists: userType = userExists.rows[0];

    if (_userExists) {
      throw new ApiError(400, "User already Exist");
    }

    let role;
    if (secretKey && secretKey === ENV.ADMIN_SECRET_KEY) {
      role = USER_TYPE.ADMIN;
    } else {
      role = USER_TYPE.USER;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await database.query(
      `INSERT INTO users (name, email, password, role, isVerified) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING * `,
      [name, email, hashedPassword, role, false]
    );

    const _user: userType = user.rows[0];

    const verificationCode: string = otpGenerator();
    console.log(`VerificationCode : ${verificationCode}`);

    await database.query(
      `UPDATE users SET email_verified_code = $1, email_verified_code_expiry = $2 WHERE id = $3 RETURNING *
        `,
      [verificationCode, verificationCodeExpiry, _user.id]
    );

    if (!_user) {
      throw new ApiError(400, "User can't register");
    }

    /* 
    TODO : the verification code send on mail via service
    await sendVerificationCode {
        verificationcode,
        email,
        name
    }
    */

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "user Register Successfully", true));
  }
);

export const verifyEmailReuqest = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await database.query(
      ` SELECT * FROM users WHERE email = $1 `,
      [email]
    );

    if (user.rows.length < 0) {
      throw new ApiError(404, "User not found");
    }

    const { hashToken, unHashedToken } = temporaryTokenGenerater();
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`${ENV.BACKEND_ORIGIN}/api/v1/tms/auth/${hashToken}`);

    await database.query(
      `UPDATE users SET email_verified_token = $1, email_verified_token_expiry = $2 WHERE id = $3 RETURNING *
        `,
      [unHashedToken, tokenExpiry, user.rows[0].id]
    );

    const otp = otpGenerator();
    await setOtp(unHashedToken, otp);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Send verify email request", true));
  }
);

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { verificationCode } = req.body;
  const { email } = req.query;

  const user = await database.query(` SELECT * FROM users WHERE email = $1 `, [
    email,
  ]);

  const _user: userType = user.rows[0];

  console.log({ _user })

  console.log({ verificationCode })

  if (!_user) {
    throw new ApiError(401, "User Not found");
  }

  if(_user.email_verified_code_expiry < new Date()) {
    console.log("true")
  }

  if (_user.email_verified_code !== verificationCode) {
    throw new ApiError(400, "Invalid OTP");
  }

  await database.query(
    ` UPDATE users SET email_verified_code = $1, email_verified_code_expiry = $2, isVerified = $3 WHERE id = $4 RETURNING *
        `,
    ["", , true, _user.id]
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User Verify Successfully", true));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await database.query("SELECT * FROM users  WHERE email = $1", [
    email,
  ]);

  const _user: userType = await fetchUser(user.rows[0].id);

  if (!_user) {
    throw new ApiError(401, "User can't Exist with this Email..");
  }

  const isPasswordCorrect = bcrypt.compare(password, _user?.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Creadential faild....");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(_user);

  console.log(`${user.rows[0].name} : Login successfully`);

  if (!_user.isverified) {
    throw new ApiError(401, "Account not verified", [], false);
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user.rows[0],
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "user Login Successfully",
        true
      )
    );
});

export const currentUser = asyncHandler(async (req: Request, res: Response) => {
  const user: userType = req.user;

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User Fetch Successfully", true));
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  console.log("user : ", user);

  await database.query("UPDATE users SET refreshToken = $1 WHERE id = $2", [
    "",
    user.id,
  ]);

  console.log(`${user.name} : Log out successfully`);

  return res
    .status(200)
    .cookie("accessToken", "")
    .cookie("refreshToken", "")
    .json(new ApiResponse(200, {}, "user Logout Successfully", true));
});

export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user: userType = req.user;

    const { name, avatar } = req.body;

    const updates: Partial<{
      name?: string;
      avatar?: string;
    }> = {};

    if (name !== undefined) updates.name = name;
    if (avatar !== undefined) updates.avatar = avatar;

    const keys = Object.keys(updates);

    if (keys.length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(updates);
    values.push(user.id);

    const query = `
        UPDATE users
        SET ${setClause}
        WHERE id = $${values.length}
        RETURNING *;
    `;

    const result = await database.query(query, values);

    console.log(result.rows[0]);

    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User Udpdate Successfully"));
  }
);
