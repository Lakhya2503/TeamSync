import { Resend } from "resend";
import { ENV } from "../config/ENV";
import { ApiResponseType } from "../types/ApiResponseType";
import { emailTemplate } from "../emails/emailSendService";

const resend = new Resend(ENV.RESEND_SECRET_KEY);

const sendVerificationEmail = async (
  email: string,
  verificationCode: string,
  subject: string,
  validateFor: Date
): Promise<ApiResponseType> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      html: emailTemplate(
        verificationCode,
        validateFor,
        "Verification Code",
        "Verification code for Account verification"
      ),
    });

    return {
      success: true,
      statusCode: 1,
      data: {},
      message: "Message send Successfully",
    };
  } catch (error) {
    console.error("error", error);
    return {
      success: true,
      statusCode: 1,
      data: {},
      message: "Message send Successfully",
    };
  }
};
