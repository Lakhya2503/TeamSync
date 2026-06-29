import  jwt  from 'jsonwebtoken';
import { ENV } from './ENV';
import { userType } from '../modules/user/user.type';


export const generateAccessToken = (user : userType) => {
    const payload : userType = {
        email : user.email,
        id : user.id,
        role : user.role
    }
    return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET , {
        expiresIn : ENV.ACCESS_TOKEN_EXPIRY
    })
}

export const generateRefreshToken = (user : userType) => {
    const payload = {
        id : user.id,
    }

    return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn : ENV.REFRESH_TOKEN_EXPIRY
    })
}

export const temporaryTokenGenerater = () => {
    
}
