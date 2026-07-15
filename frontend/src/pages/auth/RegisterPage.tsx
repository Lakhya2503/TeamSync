import React, { useState } from "react";
import useAuthStore from "../../app/authStore";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsShieldCheck } from "react-icons/bs";
import { Logo_circle_image } from "../../assets";

const RegisterPage = () => {
  const register = useAuthStore((state) => state.userRegister);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const clearAuth = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      password: password,
      email: email,
      name: name,
    };
    try {
      const res = await register(payload);
      console.log(res);
      if (res.data?.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      clearAuth();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side - Registration Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <div className="max-w-sm mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center mb-6">
              <div className="mx-auto w-25 h-25 rounded-full flex items-center justify-center mb-4">
                <img src={Logo_circle_image} alt="" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <HiUserGroup className="text-indigo-500 text-2xl" />
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Join TeamSync and start collaborating today
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-indigo-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-indigo-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    placeholder="Create a strong password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-indigo-200/50 flex items-center justify-center space-x-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <FaRocket className="text-lg" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200">
                <FaGoogle className="text-red-500 text-lg" />
                <span className="ml-2 text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200">
                <FaGithub className="text-gray-800 text-lg" />
                <span className="ml-2 text-sm font-medium">GitHub</span>
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <FaShieldAlt className="mr-1 text-indigo-500" />
                Secure
              </span>
              <span>•</span>
              <span className="flex items-center">
                <FaCheck className="mr-1 text-indigo-500 h-3 w-3" />
                Privacy Protected
              </span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10 text-white">
            <div className="text-center">
              <div className="mx-auto w-25 h-25 rounded-full flex items-center justify-center mb-4">
                  <img src={Logo_circle_image} alt="" />
                </div>
              <h1 className="text-4xl font-bold mb-3">Join TeamSync</h1>
              <p className="text-white/90 text-lg mb-6">
                Start managing your teams and projects efficiently
              </p>

              <div className="space-y-3 text-white/80">
                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <FaShieldAlt className="text-2xl" />
                  <span className="text-sm">Secure & encrypted platform</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <FaUsers className="text-2xl" />
                  <span className="text-sm">Team collaboration tools</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <FaRocket className="text-2xl" />
                  <span className="text-sm">Free to get started</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-white/20 flex justify-around">
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-white/80">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Teams</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
