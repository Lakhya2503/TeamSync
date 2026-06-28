import { NextFunction } from "express"

export const asyncHandler = (requestHandler : any) => {
    return (req : any,res: any,next : any) => {
        Promise.resolve(requestHandler(req,res)).catch((error)=>next(error))
    }
}
