import { NextFunction, Response } from "express";
import { 
        accessTokenUserData,
        AuthRequest, 
        userType 
        } from "../modules/user/user.interface";
import { ApiError } from "../utils/ApiError";
import  jwt  from 'jsonwebtoken';
import { ENV } from "../config/ENV";
import { database } from "../config/db";

export const verifyJWT = async(req : AuthRequest, res : Response, next : NextFunction) =>{
    const token = req.cookies?.accessToken
    if(!token) {
        throw new ApiError(401, "Token not found.")
    }
    try {
        const decodedToken : accessTokenUserData = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET)

        if(!decodedToken.id) {
            throw new ApiError(401, "Token expired or used")
        }

        const findUser  = await database.query("SELECT * FROM users WHERE id = $1" , [decodedToken.id])

        const user : userType = findUser.rows[0]
        req.user = user;
        next()
    } catch (error : unknown) {
        next(error)
        throw new ApiError(400, error)
    }
}