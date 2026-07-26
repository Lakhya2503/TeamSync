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

export const getMe = () => {
    return apiClient.get("/auth/get-me")
}

export const verifyEmail = () => {
    return apiClient.post("/auth/verify-email/")
}

export const verifyEmailRequest = () => {
    return apiClient.get("/auth/verify-email-request/:email")
}





// ============= auth ============= //



// ============= auth ============= //

// !! ============= Danger Zone ============= //
// !! == DELETE USER ACCOUNT

export const deleteUserAccount = () => {
    return apiClient.delete("/auth/delete-account")
}
