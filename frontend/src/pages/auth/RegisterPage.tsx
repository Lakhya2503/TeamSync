import React, { useState } from 'react'
import useAuthStore from '../../app/authStore'


const RegisterPage = () => {
  const userRegister = useAuthStore((state) => state.userRegister)

  const [ name, setName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ showPassword, setShowPassword ] = useState<Boolean>(false)
  const [ secreatKey, setSecreatKey ] = useState<string>("")


  console.log({name : name,
    password : password,
    email : email,
    secreatKey : secreatKey})

  const handleSumbit = async() => {
   
  const payload = {
    name : name,
    password : password,
    email : email,
    secreatKey : secreatKey
  }  
   const res = await userRegister(payload)
   console.log("res", res)
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
                  <label htmlFor="secreatKey" className='uppercase'>
                      secreatKey
                  </label>
                  <input 
                  className='px-3 py-2 rounded-2xl border'
                  type="text"
                  id="secreatKey"
                  value={secreatKey}
                    onChange={(e)=> setSecreatKey(e.target.value)}
                  placeholder='secreatKey'
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