import type { userType } from "../../types/user.type";

export interface RegisterResponse {
  statusCode: number;
  data: object;
  message: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    refreshToken: string;
    accessToken: string;
    user: userType;
  };
  message: string;
}
