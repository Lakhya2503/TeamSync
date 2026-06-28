import { requiredFiled } from "../../helper/user.helper";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { RegisterFileds } from "./user.type";


export const generateAccessRefreshToken = (userId) => {

}


export const registerUser = asyncHandler(async(req : any,res: any)=>{

    const { name, email, password }:RegisterFileds = req.body

    requiredFiled([name, email, password])

    
    



    return res.status(200).json(new ApiResponse(200, {}, "user Register Successfully", true))
}) 