

export const otpGenerator = () => {

    const str:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let otp:string  = ""

    for(let i = 0; i < 6; i++) {
        // otp += str.charAt(i)
        otp += str.charAt(Math.floor(Math.random() * str.length)) 
    }

    return otp
}
 
otpGenerator()

