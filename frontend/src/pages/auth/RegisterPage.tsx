import React, { useState } from 'react'
import useAuthStore from '../../app/authStore'
import { useNavigate } from 'react-router-dom'


const RegisterPage = () => {
  const userRegister = useAuthStore((state) => state.userRegister)

  const [ name, setName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ showPassword, setShowPassword ] = useState<Boolean>(false)
  const [ secretKey, setSecretKey ] = useState<string>("")
  const navigate = useNavigate()

  const clearFields = () => {
    setName("")
    setEmail("")
    setPassword("")
    setSecretKey("")
  }


  console.log({name : name, 
    password : password,
    email : email,
    secretKey : secretKey})

  const handleSumbit = async(e) => {
   e.preventDefault();
    const payload = {
      name : name,
      password : password,
      email : email,
      secretKey : secretKey
    }  
    const res = await userRegister(payload)
    console.log("res", res)
    if(res?.statusCode && res.statusCode === 200) {
        navigate('/login')
    }
    clearFields()
  }

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="">
            <form action="" onSubmit={handleSumbit}>
              <div className=" flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className='uppercase'>
                      Name
                  </label>
                  <input 
                  className='px-3 py-2 rounded-2xl border'
                  type="text"
                  id="name"
                  value={name}
                    onChange={(e)=> setName(e.target.value)}
                  placeholder='name'
                  />
              </div>
              <div className="flex flex-col gap-1">
                  <label htmlFor="email" className='uppercase'>
                      email
                  </label>
                  <input 
                  className='px-3 py-2 rounded-2xl border'
                  type="email"
                  id="email"
                  value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  placeholder='email'
                  />
              </div>
               <div className="flex flex-col gap-1">
                  <label htmlFor="password" className='uppercase'>
                      password
                  </label>
                  <input 
                  className='px-3 py-2 rounded-2xl border'
                  type="text"
                  id="password"
                  value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  placeholder='password'
                  />
              </div>

              <div className="flex flex-col gap-1">
                  <label htmlFor="secretKey" className='uppercase'>
                      secretKey
                  </label>
                  <input 
                  className='px-3 py-2 rounded-2xl border'
                  type="text"
                  id="secretKey"
                  value={secretKey}
                    onChange={(e)=> setSecretKey(e.target.value)}
                  placeholder='secretKey'
                  />
              </div>

              <button type='submit' className='bg-blue-500 rounded-2xl py-3 text-white'>
                Register
              </button>

              </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage