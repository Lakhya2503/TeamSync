import { client , isConnected } from './connection'

// ========================================
// ?? OTP
// ========================================

export const setOtp = async(id : string, otp: string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    await client.lpush(key, JSON.stringify(otp))
}

export const getOtp = async(id : string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    const payload = await client.rpop(key)
    return payload ? JSON.parse(payload) : null
}




