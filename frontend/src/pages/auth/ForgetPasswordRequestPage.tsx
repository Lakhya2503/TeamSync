// pages/ForgetPasswordRequestPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo_circle_image } from '../../assets';

const ForgetPasswordRequestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset request logic
    console.log('Reset request for:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto w-25 h-25 rounded-full flex items-center justify-center mb-4">
              <img src={Logo_circle_image} alt="" />
            </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't worry! Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
            <p className="text-sm font-medium">Reset link sent successfully!</p>
            <p className="text-xs mt-1">Please check your email inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send Reset Link
            </button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                Back To Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


export default ForgetPasswordRequestPage;