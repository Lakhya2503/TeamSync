import type { LoginResponse } from "../app/types/AuthType";
import type {
  ApiErrorType,
  ApiResponseType,
  ResponseType,
} from "../types/ResponseType";
import type { AuthLogin, AuthRegister } from "../types/user.type";
import { apiClient } from "./apiClient";

// ============= auth ============= //
export const authRegister = (payload: {
  name: string;
  email: string;
  password: string;
  secretKey: string;
}): Promise<ResponseType> => {
  return apiClient
    .post("/auth/register", {
      json: payload,
    })
    .json<ResponseType>();
};

export const authLogin = (payload: { email: string; password: string }) => {
  const res = apiClient
    .post("/auth/login", {
      json: payload,
    })
    .json<LoginResponse>();
  return res;
};

export const authLogout = () => {
  return apiClient.get("/auth/logout");
};

export const getMe = () => {
  return apiClient.get("/auth/get-me");
};

export const verifyEmail = (payload: { verificationCode: string }) => {
  return apiClient.post("/auth/verify", {
    json: payload,
  });
};

export const verifyEmailRequest = (payload: { email: string }) => {
  console.log("EMAIL : ", payload);
  return apiClient.post("/auth/verify-email/request", {
    json: payload,
  });
};

// !! ============= Danger Zone ============= //
// !! == DELETE USER ACCOUNT

export const deleteUserAccount = () => {
  return apiClient.delete("/auth/delete-account");
};
