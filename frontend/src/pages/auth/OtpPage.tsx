import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../app/authStore'

const OtpPage = () => {

  const [otp, setOtp] = useState<string>("")
  const [ resendOtpSection, setResendOtpSection ] = useState<boolean>(false)
  const userVerifyEmail = useAuthStore((state) => state.userVerifyEmail)
  const userVerifyEmailRequest = useAuthStore((state) => state.userVerifyEmailRequest)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    await userVerifyEmail(otp)
  }

  const handleVerifyEmailRequest = async(e) => {
    e.preventDefault()
    await userVerifyEmailRequest(email)
    setResendOtpSection(false)
  }


  resendOtpSection === false ? (
    <div className="h-screen bg-gray-800">
        <form action="" onSubmit={handleVerifyEmailRequest}>
            <input type="email" />
            <button type='submit'>
                verify email request
            </button>
        </form>
    </div>
  ) : <div className="min-h-screen bg-gray-800 h-fit w-full">
        <div className="flex justify-center items-center">
          <form action="" onSubmit={handleSubmit}>
            <div className=" flex flex-col">
            <input type="text"
            placeholder='otp'
            onChange={(e)=> setOtp(e.target.value)}
            />
            <button type='submit'>
               Verify Email
            </button>
            </div>
        </form>
        </div>
    </div>
}

export default OtpPage