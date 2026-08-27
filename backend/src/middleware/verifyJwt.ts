import { NextFunction, Request, Response } from "express";
import { 
        accessTokenUserData,
        userType 
        } from "../modules/user/user.interface";
import { ApiError } from "../utils/ApiError";
import  jwt  from 'jsonwebtoken';
import { ENV } from "../config/ENV";
import { fetchUser } from "../helper/user.helper";

export const verifyJWT = async(req : Request, res : Response, next : NextFunction):Promise<void> =>  {
    const token = req.cookies?.accessToken
    if(!token) {
        throw new ApiError(401, "Token not found.")
    }
    try {
        const decodedToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as accessTokenUserData

        if(!decodedToken) {
            throw new ApiError(401, "Token expired or used")
        }

        const user  = await fetchUser(decodedToken.id)

        if(!user) {
            throw new ApiError(401, "Token expired or used")
        }

        req.user = user as userType
        
        next()
    } catch (error) {
        next(error)
        throw new ApiError(400, `${error}`)
    }
}