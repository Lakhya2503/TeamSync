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
import { redirect } from "react-router-dom";

interface AuthStore {
  user: userType | null;
  isAuthenticated: boolean;
  role: "Admin" | "User" | unknown;

  userRegister: (data : {
    email : string,
    name : string,
    password : string
  }) => Promise<ApiResponseType | ApiErrorType>;

  userLogin: (data: {
    email : string,
    password : string
  }) => Promise<ApiResponseType | ApiErrorType>;

  userLogout: () => Promise<ApiResponseType | ApiErrorType>;
  getUser: () => Promise<ApiResponseType | ApiErrorType>;
  userVerifyEmail: (data: AuthVerifyEmail) => Promise<ApiResponseType | ApiErrorType>;
  userVerifyEmailRequest: (data: AuthVerifyEmailRequest) => Promise<ApiResponseType | ApiErrorType>;
}

const authStore = (set: StoreApi<AuthStore>["setState"]): AuthStore => ({
  user : null,
  isAuthenticated: false,
  role: "",
  userRegister: async (data) => {
    try {
      const res = await authRegister(data);
      set({
        user: null,
        isAuthenticated: false,
        role: "",
      });
      console.log("res",res)
      return res;
    } catch (error) {
      console.log("error", error)
      if (error instanceof Error) {
        return error;
      }
      throw (error)
    }
  },
  userLogin: async (data) => {
    try {
      const res = await authLogin(data);
      set({
        user: res.data?.user,
        isAuthenticated: true,
        role: res.data?.user?.role,
      });
      return res.data;
    } catch (error) {
      console.log("error", error)
      if (error instanceof Error) {
        return error;
      }
      throw (error)
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
       console.log("error", error)
      if (error instanceof Error) {
        return error;
      }
      throw (error)
    }
  },
  userVerifyEmail: async () => {
    const res = await verifyEmail();
    set({
      user: res.data.data.user,
      isAuthenticated: true,
    });
    return res.data;
  },
  userVerifyEmailRequest: async () => {
    const res = await verifyEmailRequest();
    set({
      user: res.data.data.user,
      isAuthenticated: true,
    });
    return res.data;
  },

  userLogout: async () => {
    const res = await authLogout();
    set({
      user: null,
      isAuthenticated: false,
    });
    return res.data;
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
