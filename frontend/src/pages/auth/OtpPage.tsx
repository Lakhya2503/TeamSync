import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../app/authStore'

const OtpPage = () => {

  const [otp, setOtp] = useState<string>("");
  const userVerifyEmail = useAuthStore((state) => state.userVerifyEmail)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("otp : ", otp)
    const res = await userVerifyEmail(otp)
    console.log("res",res)
  }

  return (
  <div className="min-h-screen max-h-fit bg-gray-800 h-fit w-full text-white">
        <div className="flex justify-center items-center text-center">
          <form action="" onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center justify-center text-center">
            <input type="text"
            placeholder='otp'
            onChange={(e)=> setOtp(e.target.value)}
            className='px-4 py-3 rounded-2xl border border-blue-700 my-10'
            />
            <button type='submit' className='text-white bg-blue-600 px-5 py-2 rounded-3xl'>
               Verify Email
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default OtpPage