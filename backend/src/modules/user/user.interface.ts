export interface UserType {
    ADMIN? : string,
    USER? : string,
    MANAGER? : string,
    Member? : string
}

export interface userType {
    name?: string,
    id: string,
    email: string,
    password?: string,
    avatar?: string,
    role?: string,
    refreshtoken?: string,
    reset_password_token_expiry?: string,
    reset_password_token?: string,
    created_at?: string
}
