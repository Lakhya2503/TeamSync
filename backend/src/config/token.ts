import  jwt  from 'jsonwebtoken';
import { ENV } from './ENV';
import { 
    accessTokenUserData, 
    refreshTokenUserData, 
    userType 
} from '../modules/user/user.interface';
import crypto from 'crypto'

export const generateAccessToken = (user : userType) => {
    const payload : accessTokenUserData = {
        email : user.email,
        id : user.id,
        role : user.role
    }
    return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET , {
        expiresIn : ENV.ACCESS_TOKEN_EXPIRY
    })
}

export const generateRefreshToken = (user : userType) => {
    const payload : refreshTokenUserData = {
        id : user.id,
    }
    
    return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn : ENV.REFRESH_TOKEN_EXPIRY
    })
}

export const temporaryTokenGenerater = () => {
    const hashToken = crypto.randomBytes(20).toString("hex")

    const unHashedToken = crypto.createHash('sha256').update(hashToken).digest('hex')

    return {
        hashToken,
        unHashedToken
    }
}

