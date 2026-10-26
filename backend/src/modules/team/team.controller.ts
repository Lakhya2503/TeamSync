import { requiredFiled } from "../../helper/user.helper";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const createTeam = asyncHandler(
  async (req: Request, res: Response): Promise<{}> => {
    const { teamName } = req.body;

    console.log("res.user", req.user);



    requiredFiled([teamName]);

    return res
      .status(201)
      .json(new ApiResponse(201, {}, "Team created successfuly", true));
  }
);
