import type { userType } from "./user.type";

export interface ApiResponseType {
  statusCode: number;
  data: {
    user? : userType
  };
  message: string;
  success?: boolean;
}

export interface ApiErrorType {
  statusCode?: number;
  error?: [];
  message?: string;
  success?: boolean;
}
