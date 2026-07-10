import type { AuthLogin, AuthRegister } from "../types/user.type"
import { apiClient } from "./apiClient"

// ============= auth ============= //
export const authRegister = (payload : AuthRegister) => {
    return apiClient.post("/auth/register", payload)
}

export const authLogin = (payload : AuthLogin) => {
    return apiClient.post("/auth/login", payload)
}

export const authLogout = () => {
    return apiClient.get("/auth/logout")
}
