import { type StoreApi } from "zustand";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  AuthLogin,
  AuthRegister,
  AuthResponse,
  AuthVerifyEmail,
  AuthVerifyEmailRequest,
  userType,
} from "../types/user.type";
import {
  authRegister,
  authLogin,
  authLogout,
  getMe,
  verifyEmail,
  verifyEmailRequest,
} from "../apis/apis";
import type { ApiResponseType } from "../types/ResponseType";
import type { ApiErrorType } from "../types/ResponseType";
import type { LoginResponse, RegisterResponse } from "./types/AuthType";
import toast from "react-hot-toast";

interface AuthStore {
  user: userType | null;
  isAuthenticated: boolean;
  role: "admin" | "user" | unknown;
  accessToken: string;
  refreshToken: string;

  userRegister: (data: {
    email: string;
    name: string;
    password: string;
    secretKey: string;
  }) => Promise<RegisterResponse | ApiErrorType>;

  userLogin: (data: {
    email: string;
    password: string;
  }) => Promise<LoginResponse | ApiErrorType>;

  userLogout: () => Promise<ApiResponseType | ApiErrorType>;
  getUser: () => Promise<ApiResponseType | ApiErrorType>;
  userVerifyEmail: (
    data: AuthVerifyEmail
  ) => Promise<ApiResponseType | ApiErrorType>;
  userVerifyEmailRequest: (
    verificationCode: string
  ) => Promise<ApiResponseType | ApiErrorType>;
}

const authStore = (set: StoreApi<AuthStore>["setState"]): AuthStore => ({
  user: null,
  isAuthenticated: false,
  role: "",
  accessToken: "",
  refreshToken: "",
  userRegister: async (data) => {
    try {
      console.log("payload :", data);
      const res = await authRegister(data);
      set({
        user: null,
        isAuthenticated: false,
        role: "",
      });
      console.log("userRegister response", res);
      toast.success(res.message)
      return res;
    } catch (error) {
      console.log("userRegister error", error);
      toast.error(error?.data?.message)
      if (error instanceof Error) {
        return error;
      }
      throw error;
    }
  },
  userLogin: async (data) => {
    try {
      const res = await authLogin(data);

      console.log("login:", res.message);

      toast.success(res.message || "login successfully");
      set({
        accessToken: res.data?.accessToken,
        refreshToken: res.data?.refreshToken,
        user: res.data?.user,
        isAuthenticated: true,
        role: res.data?.user?.role?.toLowerCase(),
      });

      return res as LoginResponse;
    } catch (error: any) {
      const message =
        error?.data?.message 
      toast.error(message);
      return {
        success: false,
        message,
      } as ApiErrorType;
    }
  },

  getUser: async () => {
    try {
      const res = await getMe();
      set({
        user: res.data?.user,
        isAuthenticated: true,
      });
      return res.data;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        return error;
      }
      throw error;
    }
  },
  userVerifyEmail: async (verificationCode: string) => {
    try {
      const res = await verifyEmail(verificationCode);
      set({
        user: res.data.user,
        isAuthenticated: true,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  userVerifyEmailRequest: async (email: string) => {
    try {
      const res = await verifyEmailRequest(email);
      set({
        user: res.data.data.user,
        isAuthenticated: true,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  userLogout: async () => {
    try {
      const res = await authLogout();
      set({
        user: null,
        isAuthenticated: false,
      });
      return res.data;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
      return error;
    }
  },
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: "auth",
    })
  )
);

export default useAuthStore;
