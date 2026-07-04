import { Request, Response } from "express"
import { ApiResponse } from "../../utils/ApiResponse"

export interface accessTokenUserData {
    id: string,
    email: string,
    role?: string,
}

export interface refreshTokenUserData {
    id: string,
}

export interface auth_userType {
    USER : string,
    ADMIN : string,
}

export interface teamUserType {
    ADMIN : string,
    MANAGER : string,
    MEMBER : string
}



export interface userType {
    name: string,
    id: string,
    email: string,
    password: string,
    avatar?: string,
    role?: string,
    refreshtoken?: string,
    reset_password_token_expiry?: string,
    reset_password_token?: string,
    created_at?: string
}

export interface AuthRequest extends Request {
    user : userType
}

// =======================  //
//  ?? register interface 
// ======================= //
// ---------- Request ---------- //
interface RegisterRequestBody  {
    name: string,
    email: string,
    password: string,
    secretKey? : string,
    avatar? : string
}

export type RegisterRequest = Request < {},{}, RegisterRequestBody >;

// ---------- Response ---------- //
interface RegisterResponseData {
    user? : userType,
    refreshToken? : string,
    accessToken? : string
}

export type RegisterResponse = Response<ApiResponse<RegisterResponseData> >;


// ========== xx ==========


// // =======================  //
// //  ?? verifyEmail interface 
// // ======================= //
// // ---------- Request ---------- //
// interface LoginRequestBody  {
//     email: string,
//     password: string,
// }

// export type LoginRequest = Request < {},{}, LoginRequestBody >;

// // ---------- Response ---------- //
// export interface LoginResponseData {
//     user : userType,
//     refreshToken : string,
//     accessToken : string
// }

// export type LoginResponse = Response<ApiResponse<LoginResponseData>>;

// // ========== xx ==========



// =======================  //
//  ?? login interface 
// ======================= //
// ---------- Request ---------- //
interface LoginRequestBody  {
    email: string,
    password: string,
}

export type LoginRequest = Request < {},{}, LoginRequestBody >;

// ---------- Response ---------- //
export interface LoginResponseData {
    user : userType,
    refreshToken : string,
    accessToken : string
}

export type LoginResponse = Response<ApiResponse<LoginResponseData>>;

// ========== xx ==========

// =======================  //
//  ?? logout interface 
// ======================= //
// ---------- Request ---------- //
export interface LogoutRequest extends Request {
    user : userType
}

// ---------- Response ---------- //
export type LogoutResponse = Response<ApiResponse<{}>>;

// ========== xx ==========


// =======================  //
//  ?? userUpdate interface 
// ======================= //
// ---------- Request ---------- //
interface UserUpdateRequestBody  {
    name? : string,
    avatar? : string
}

interface UserUpdateRequestParams {
    user : userType
}

export type UserUpdateRequest = Request <UserUpdateRequestParams,{}, UserUpdateRequestBody >;

// ---------- Response ---------- //
interface UserUpdateResponseData {
    user : userType,
}

export type UserUpdateResponse = Response<ApiResponse<UserUpdateResponseData> >;

// ========== xx ==========


