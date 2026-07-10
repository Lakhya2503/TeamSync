import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../app/authStore'

const LoginPage = () => {

  const login = useAuthStore((state)=> state.userLogin)
  const user = useAuthStore((state)=> state.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const clearAuth = () => {
    setEmail("")
    setPassword("")
  }

  const handleLogin = async() => {
    // e.preventDefault()
    const payload = { email : email, password : password }
    try {
      const res = await login(payload)
      console.log(res.data.user)
      console.log(user)
      if(res.data.user){
        navigate("/dashboard")
      }
    } catch (error) {
      console.error(error)
    }
     clearAuth()
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              type="email" 
              value={email}
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Login
          </button>
          <p className='text-center gap-2 font-medium'>
            Don't have an account{''}
            <Link to={'/register'}
              className='text-blue-500 font-medium ml-1'
            >
                Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage