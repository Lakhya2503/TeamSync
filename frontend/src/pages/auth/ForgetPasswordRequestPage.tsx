// pages/ForgetPasswordRequestPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo_circle_image } from '../../assets';

const ForgetPasswordRequestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset request for:', email);
    setSubmitted(true);
  };

  // shared clay input classes
  const clayInput =
    'w-full rounded-2xl border-none bg-[#e0e5ec] px-4 py-3 text-[#4a5568] placeholder-[#a0aec0] ' +
    'shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff] transition-shadow duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#e0e5ec] p-4">
      {/* Claymorphic pastel background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/40 blur-3xl" />
      </div>

      {/* Clay shell */}
      <div
        className="relative z-10 w-full max-w-md rounded-[2.5rem] border-none bg-[#e0e5ec] p-3
          shadow-[20px_20px_60px_#b8bec7,-20px_-20px_60px_#ffffff]"
      >
        <div className="rounded-[2rem] p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#e0e5ec]
                shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ec]
                  shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
              >
                <img src={Logo_circle_image} alt="Logo" className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[#4a5568]">Forgot Password?</h2>
            <p className="mt-2 text-sm font-medium text-[#718096]">
              Don't worry! Enter your email address and we'll send you a password reset link.
            </p>
          </div>

          {submitted ? (
            /* Clay success tablet (inset) */
            <div
              className="rounded-2xl bg-[#e0e5ec] p-5 text-center
                shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
            >
              <p className="text-sm font-bold text-emerald-600">Reset link sent successfully!</p>
              <p className="text-xs font-medium text-[#718096] mt-1">Please check your email inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#4a5568] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clayInput}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Clay primary button */}
              <button
                type="submit"
                className="w-full rounded-2xl border-none py-3 font-bold text-white
                  bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                  shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                  transition-all duration-150
                  hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                  hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                  active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Back To Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordRequestPage;