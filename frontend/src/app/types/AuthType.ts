import type { userType } from "../../types/user.type";

export interface RegisterResponse {
  statusCode: number;
  data: object;
  message: string;
}

export interface LoginResponse {
  statusCode?: number;
  data: Data;
  message?: string;
}

interface Data  {
    user : userType,
    accessToken : string,
    refreshToken : string
}