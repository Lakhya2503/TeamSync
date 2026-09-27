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
import type { LoginResponse, RegisterResponse } from "./types/auth";

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
    data: AuthVerifyEmailRequest
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
      const res = await authRegister(data);
      set({
        user: null,
        isAuthenticated: false,
        role: "",
      });
      console.log("res", res);
      return res;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        return error;
      }
      throw error;
    }
  },
  userLogin: async (data) => {
    try {
      const res = await authLogin(data);
      set({
        accessToken : res.data.accessToken,
        refreshToken : res.data.refreshToken,
        user: res.data.user,
        isAuthenticated: true,
        role: res.data?.user?.role.toLowerCase(),
      });
      console.log("login : ", res);
      return res.data;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        return error;
      }
      throw error;
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
  userVerifyEmail: async () => {
    try {
      const res = await verifyEmail();
      set({
        user: res.data.user,
        isAuthenticated: true,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  userVerifyEmailRequest: async () => {
    try {
      const res = await verifyEmailRequest();
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
