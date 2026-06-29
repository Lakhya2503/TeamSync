import { NextFunction, Response } from "express";
import { AuthRequest } from "../modules/user/user.interface";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJWT = asyncHandler((req : AuthRequest, res : Response, next : NextFunction) =>{
    
    try {
        
    } catch (error) {
        
    }
    
})