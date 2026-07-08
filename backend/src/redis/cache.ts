import { userType } from '../modules/user/user.interface';
import { client , isConnected } from './connection'

// ========================================
// ?? OTP
// ========================================

// *** SET OTP ***
export const setOtp = async(id : string, otp: string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    await client.lpush(key, JSON.stringify(otp))
}

// *** GET OTP ***
export const getOtp = async(id : string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    const payload = await client.rpop(key)
    return payload ? JSON.parse(payload) : null
}


// ========================================
// ?? USER
// ========================================

// *** SET USER ***
export const setUser = async(userId:string, user:userType) => {
    if(!client || !isConnected) return null
    const key = `user:${userId}`
    await client.set(key, JSON.stringify(user))
}

// *** GET USER ***
export const getUser = async(userId:string) => {
    if(!client || !isConnected) return null
    const key = `user:${userId}`
    const user = await client.get(key)
    return user ? JSON.parse(user) : null
}

// *** DEL USER ***
export const deleteUser = async(userId:string) => {
    if(!client || !isConnected) return null
    const key = `user:${userId}`
    await client.del(key)
}