import { client , isConnected } from './connection'

// ========================================
// ?? OTP
// ========================================

export const setOtp = async(id : string, otp: string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    await client.set(key, JSON.stringify(otp))
}

export const gettOtp = async(id : string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    const payload = await client.get(key)
    return payload ? JSON.parse(payload) : null
}

export const deletOtp = async(id : string, otp: string) => {
    if(!client || !isConnected) return null;
    const key = `otp:${id}`
    await client.del(key)
}


