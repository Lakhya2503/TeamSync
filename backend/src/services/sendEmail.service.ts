import { Resend } from "resend"
import { ENV } from "../config/ENV"
import { ApiResponseType } from "../types/ApiResponseType"

const resend = new Resend(ENV.RESEND_SECRET_KEY)

const sendVerificationEmail = async( email : string, verificationCode: string , subject: string ) :Promise<ApiResponseType> => {

    try {
        const { data, error } = await resend.emails.send({
            from : 'onboarding@resend.dev' ,
            to : email ,
            subject : subject ,
            html : sendVerificationEmail(
                
            ) ,
        })

        return{
            success : true,
            statusCode : 1,
            data : {},
            message : "Message send Successfully"
        }
    } catch (error) {
        console.error("error",error)
        return{
            success : true,
            statusCode : 1,
            data : {},
            message : "Message send Successfully"
        }
    }
}   