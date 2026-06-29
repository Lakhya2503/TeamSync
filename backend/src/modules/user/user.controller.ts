import { database } from "../../config/db";
import { ENV } from "../../config/ENV";
import { requiredFiled } from "../../helper/user.helper";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from 'bcrypt';
import {  userType } from "./user.type";
import { generateAccessToken, generateRefreshToken } from "../../config/token";

const options = {
    httpOnly : true,
    secure : true
}

export const generateAccessRefreshToken = async (user:userType) => {
    const refreshToken = generateAccessToken(user);
    const accessToken = generateRefreshToken(user);

    await database
                .query(
                    "UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING refreshToken ",
                    [ refreshToken, user.id ]
                )

    return {
        accessToken, 
        refreshToken
    }
}

export const registerUser = asyncHandler(async(req : any,res: any)=>{
    const { name, email, password } = req.body

    requiredFiled([name, email, password])

    const userExists: any  = await database.query(
        "SELECT * FROM users WHERE email = $1 ",[email]
    )

    if(userExists.rows.length > 0) {
        throw new ApiError(400, "User already Exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await database.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING * ", [name,email,hashedPassword]
    )

    if(!user.rows.length) {
        throw new ApiError(400 , "User can't register")
    }

    return res.status(200).json(new ApiResponse(200, {}, "user Register Successfully", true))
}) 

export const loginUser = asyncHandler(async(req : any,res: any)=>{

    const { email, password } = req.body

    const user = await database.query("SELECT * FROM users  WHERE email = $1", [email])

    if(!user.rows.length) {
        throw new ApiError(401, "User can't Exist with this Email..")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password)

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Creadential faild....")
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user.rows[0])

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
        "users" : user.rows[0],
        "accessToken" : accessToken,
        "refreshToken" : refreshToken
    }, "user Login Successfully", true))
})

export const logoutUser = asyncHandler(async(req : any,res: any)=>{

    const user:userType = req.user

    console.log("user : ", user)

    await database.query(
        "UPDATE users SET refreshToken = $1 WHERE id = $1",["", user.id]
    )

    return res
        .status(200)
        .cookie("accessToken", "")
        .cookie("refreshToken", "")
        .json(new ApiResponse(200, {}, "user Logout Successfully", true))
})