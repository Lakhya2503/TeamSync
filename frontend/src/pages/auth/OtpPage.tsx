import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/authStore";

const OtpPage = () => {
  const [otp, setOtp] = useState<string>("");
  const [showResend, setShowResend] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("")
  const userVerifyEmail = useAuthStore((state) => state.userVerifyEmail);
  const emailVerifticationRequest = useAuthStore((state) => state.userVerifyEmailRequest)

  const navigate = useNavigate();


  const handleResendEmailVerificationRequest = async(e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
        try {
            const res = await emailVerifticationRequest(email)
            console.log("res :" , res)
            setShowResend(false)
        } catch (error) {
            console.log("error")
        }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("otp : ", otp);
    const res = await userVerifyEmail(otp);
    console.log("res", res);
  };

  return showResend ? (
    <div className="min-h-screen max-h-fit bg-gray-800 h-fit w-full text-white">
      <form action="" onSubmit={handleResendEmailVerificationRequest}>
        <div className=" flex flex-col items-center justify-center text-center">
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-blue-700 my-10"
          />
          <button
            type="submit"
            className="text-white bg-blue-600 px-5 py-2 rounded-3xl"
          >
            Resend Verification code
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="min-h-screen max-h-fit bg-gray-800 h-fit w-full text-white">
      <div className="flex justify-center items-center text-center">
        <form action="" onSubmit={handleSubmit}>
          <div className=" flex flex-col items-center justify-center text-center">
            <input
              type="text"
              placeholder="otp"
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-blue-700 my-10"
            />
            <button
              type="submit"
              className="text-white bg-blue-600 px-5 py-2 rounded-3xl"
            >
              Verify Email
            </button>
          </div>
        </form>
      </div>
      <button
        className="text-white bg-blue-600 px-5 py-2 rounded-3xl"
        onClick={() => setShowResend(true)}
      >
        Resend
      </button>
    </div>
  );
};
export default OtpPage;
