
export interface UserType {
    ADMIN : string,
    MEMBER : string,
    MANAGER : string
}

export interface RegisterFileds {
    name : string , 
    email : string, 
    password : string
}

export interface accessTokenUserData {
    email : string,
    id : string
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
