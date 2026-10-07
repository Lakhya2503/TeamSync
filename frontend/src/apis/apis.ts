import type { ApiResponseType } from "../types/ResponseType";
import type { AuthLogin, AuthRegister } from "../types/user.type";
import { apiClient } from "./apiClient";

// ============= auth ============= //
export const authRegister = (payload: {
  name: string;
  email: string;
  password: string;
  secretKey: string;
}): Promise<ApiResponseType> => {
  return apiClient
    .post("/auth/register", {
      json: payload,
    })
    .json<ApiResponseType>();
};

export const authLogin = (payload: { email: string; password: string }) => {
  return apiClient
    .post("/auth/login", {
      json: payload,
    })
    .json<ApiResponseType>();
};

export const authLogout = () => {
  return apiClient.get("/auth/logout");
};

export const getMe = () => {
  return apiClient.get("/auth/get-me");
};

export const verifyEmail = (verificationCode : string) => {
  return apiClient.get("/auth/verify", {
    json : verificationCode
  }).json();
};

export const verifyEmailRequest = () => {
  return apiClient.get("/auth/verify-email-request/:email");
};


// !! ============= Danger Zone ============= //
// !! == DELETE USER ACCOUNT

export const deleteUserAccount = () => {
  return apiClient.delete("/auth/delete-account");
};
