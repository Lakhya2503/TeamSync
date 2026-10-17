import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const createTeam = asyncHandler(async(req:Request, res: Response)=>{


  const {
      
  } = req.body


  return res.json(
    new ApiResponse(
      201,
      {
      },
      `Team  create  successfully`
    )
  )
})