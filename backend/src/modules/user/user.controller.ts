import { database } from "../../config/db";
import { ENV } from "../../config/ENV";
import { requiredFiled } from "../../helper/user.helper";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from 'bcrypt';
import { 
    LoginRequest, 
    LoginResponse, 
    LogoutRequest, 
    LogoutResponse, 
    RegisterRequest, 
    RegisterResponse, 
    userType,
    UserUpdateRequest,
    UserUpdateResponse
} from "./user.interface";
import { 
    generateAccessToken, 
    generateRefreshToken 
} from "../../config/token";
import { USER_TYPE } from "./user.type";


const options = {
    httpOnly : true,
    secure : true
}

export const generateAccessRefreshToken = async (user:userType) => {
    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);

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

export const registerUser = asyncHandler(async(req : RegisterRequest, res: RegisterResponse)=>{
    const { name, email, password, secretKey } = req.body

    requiredFiled([name, email, password])

    const userExists: any  = await database.query(
        "SELECT * FROM users WHERE email = $1 ",[email]
    )

    if(userExists.rows.length > 0) {
        throw new ApiError(400, "User already Exist")
    }

    let role;
    if(secretKey && secretKey === ENV.ADMIN_SECRET_KEY) {
        role = USER_TYPE.ADMIN
    } else {
        role = USER_TYPE.USER
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await database.query(
            `INSERT INTO users (name, email, password, role) 
            VALUES ($1, $2, $3, $4)
            RETURNING * `, 
            [name,email,hashedPassword,role]
    )

    if(!user.rows.length) {
        throw new ApiError(400 , "User can't register")
    }

    return res.status(200).json(new ApiResponse(200, {}, "user Register Successfully", true))
}) 

export const loginUser = asyncHandler(async(req : LoginRequest,res: LoginResponse)=>{

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
        "user" : user.rows[0],
        "accessToken" : accessToken,
        "refreshToken" : refreshToken
    }, "user Login Successfully", true))
})

export const logoutUser = asyncHandler(async(req : LogoutRequest,res: LogoutResponse)=>{

    const user = req.user

    console.log("user : ", user)

    await database.query(
        "UPDATE users SET refreshToken = $1 WHERE id = $2",["",user.id]
    )

    return res
        .status(200)
        .cookie("accessToken", "")
        .cookie("refreshToken", "")
        .json(new ApiResponse(200, {}, "user Logout Successfully", true))
})

export const updateUserProfile = asyncHandler(async(req: UserUpdateRequest, res : UserUpdateResponse) => {

    const user : userType = req.user
    
    
    return res.status(200).json(new ApiResponse(200, { user }, "User Udpdate Successfully"))
})
