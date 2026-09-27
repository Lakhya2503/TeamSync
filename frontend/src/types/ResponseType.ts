import type { userType } from "./user.type";

export interface ApiResponseType {
  statusCode: number;
  data: object;
  message: string;
  success?: boolean;
}

export interface ApiErrorType {
  statusCode?: number;
  error?: [];
  message?: string;
  success?: boolean;
}
