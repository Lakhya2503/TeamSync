import { Resend } from "resend";
import { ENV } from "../config/ENV";
import { ApiResponseType } from "../types/ApiResponseType";
import { emailTemplate } from "../emails/emailSendService";

const resend = new Resend(ENV.RESEND_SECRET_KEY);

export const sendVerificationEmail = async (
  email: string,
  subject: string,
  description : string,
  validateFor: Date,
  verificationCode?: string,
  otherUrl? : string,
  typeOfUrldescription? : string,
): Promise<ApiResponseType> => {
  try {
    const { data, error : emailError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      html: emailTemplate(
        verificationCode,
        validateFor,
         subject ? subject : "Verification Code",
        description ? description : "Verification code for Account verification",
        otherUrl ? otherUrl : "" ,
        typeOfUrldescription ? typeOfUrldescription : "",
      ),
    });

    return {
      success: true,
      statusCode: 1,
      data : {},
      message: "Message send Successfully",
    };
  } catch (error) {
    console.error("error", error);
    return {
      success: true,
      statusCode: 1,
      data: { error },
      message: "Message send Successfully",
    };
  }
};
