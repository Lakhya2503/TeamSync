import React, { useState } from 'react'
import useAuthStore from '../../app/authStore'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  
    const register = useAuthStore((state)=> state.userRegister)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const clearAuth = () => {
      setEmail("")
      setName("")
      setPassword("")
    }

    const handleRegister = async(e:Event) => {
      e.preventDefault()
      const payload = {
        password : password,
        email : email,
        name : name
      }
      try {
        const res = await register(payload)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      clearAuth()
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input 
              type="text" 
              value={name}
              id='name'
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

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
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Register
          </button>
          <p className='text-center gap-2 font-medium'>
            Already have an account{''}
            <Link to={'/login'}
              className='text-blue-500 font-medium ml-1'
            >
                login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage