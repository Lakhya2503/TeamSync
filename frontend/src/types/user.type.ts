export interface userType {
    id? : string,
    name? : string,
    email : string,
    avatar? : string,
    password : string
}

export interface AuthRegister {
    name : string,
    email : string,
    password : string
}

export interface AuthResponse {
    user : userType
}

export interface AuthLogin {
    email : string,
    password : string
}