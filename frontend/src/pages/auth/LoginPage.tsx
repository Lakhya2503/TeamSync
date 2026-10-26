import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../app/authStore";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaCheck,
} from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { Logo_circle_image } from "../../assets";

// shadcn/ui primitives
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Card, CardContent } from "#components/ui/card";

const LoginPage = () => {
  const login = useAuthStore((state) => state.userLogin);
  const user = useAuthStore((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const clearAuth = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = { email, password };
    try {
      const res = await login(payload);
      if (res.message === "Account not verified") {
        navigate("/verify-email");
        return;
      }
      clearAuth();
      navigate(`/${user?.role.toLowerCase()}/dashboard`);
    } catch (error) {
      console.log("error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#e0e5ec] p-4">
      {/* Claymorphic pastel background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/40 blur-3xl" />
      </div>

      {/* Clay shell */}
      <Card
        className="relative z-10 w-full max-w-5xl overflow-visible rounded-[2.5rem] border-none bg-[#e0e5ec] p-3
          shadow-[20px_20px_60px_#b8bec7,-20px_-20px_60px_#ffffff]"
      >
        <CardContent className="p-0">
          <div className="flex flex-col overflow-hidden rounded-[2rem] md:flex-row">
            {/* ---------------- Left showcase ---------------- */}
            <div className="relative flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-10">
              <div className="relative z-10 w-full text-center">
                {/* Logo clay puck */}
                <div
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e0e5ec]
                    shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ec]
                      shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                  >
                    <img src={Logo_circle_image} alt="Logo" className="h-12 w-12" />
                  </div>
                </div>

                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#4a5568] md:text-4xl">
                  Welcome Back!
                </h1>
                <p className="mb-7 text-base font-medium text-[#718096] md:text-lg">
                  Sign in to continue managing your teams and projects
                </p>

                {/* Feature clay pills */}
                <div className="space-y-3">
                  {[
                    {
                      icon: <FaShieldAlt className="text-lg text-indigo-500" />,
                      label: "Secure & encrypted platform",
                    },
                    {
                      icon: <FaUsers className="text-lg text-indigo-500" />,
                      label: "Team collaboration tools",
                    },
                    {
                      icon: <FaRocket className="text-lg text-indigo-500" />,
                      label: "Real-time project tracking",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-3 rounded-2xl bg-[#e0e5ec] p-3
                        shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
                        transition-shadow duration-200 hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]"
                    >
                      {item.icon}
                      <span className="text-sm font-semibold text-[#4a5568]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats clay tiles */}
                <div className="mt-8 flex justify-around gap-3">
                  {[
                    { value: "10K+", label: "Active Users" },
                    { value: "500+", label: "Teams" },
                    { value: "4.9★", label: "Rating" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-1 flex-col items-center rounded-2xl bg-[#e0e5ec] px-3 py-4
                        shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]"
                    >
                      <div className="text-xl font-extrabold text-[#4a5568]">{s.value}</div>
                      <div className="text-xs font-medium text-[#718096]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- Right form ---------------- */}
            <div className="w-full p-6 sm:p-10 md:w-1/2">
              <div className="mx-auto max-w-sm">
                {/* Mobile logo puck */}
                <div className="mb-6 flex items-center justify-center md:hidden">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ec]
                      text-2xl font-extrabold text-indigo-500
                      shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]"
                  >
                    TS
                  </div>
                </div>

                <div className="mb-1 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0e5ec]
                      shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff]"
                  >
                    <HiUserGroup className="text-xl text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#4a5568]">Welcome Back</h2>
                </div>
                <p className="mb-7 text-sm font-medium text-[#718096]">
                  Please enter your credentials to sign in
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-bold text-[#4a5568]">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                        <FaEnvelope className="text-indigo-400" />
                      </div>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="h-auto rounded-2xl border-none bg-[#e0e5ec] py-3 pl-10 text-[#4a5568]
                          placeholder-[#a0aec0] shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff]
                          transition-shadow duration-200
                          focus-visible:ring-2 focus-visible:ring-indigo-300/50 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-bold text-[#4a5568]">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                        <FaLock className="text-indigo-400" />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="h-auto rounded-2xl border-none bg-[#e0e5ec] py-3 pl-10 pr-12 text-[#4a5568]
                          placeholder-[#a0aec0] shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff]
                          transition-shadow duration-200
                          focus-visible:ring-2 focus-visible:ring-indigo-300/50 focus-visible:ring-offset-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[#a0aec0]
                          transition-colors hover:text-indigo-500"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-5 w-5" />
                        ) : (
                          <FaEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <div className="text-right">
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit clay button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gap-2 rounded-2xl border-none py-3 font-bold text-white
                      bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                      shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                      transition-all duration-150
                      hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                      hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                      active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]
                      disabled:opacity-60 h-10"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <FaArrowRight className="text-lg" />
                      </>
                    )}
                  </Button>

                  <p className="text-center font-medium text-[#718096]">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-bold text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
                    >
                      Create one now
                    </Link>
                  </p>
                </form>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#c3cad5]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-[#e0e5ec] px-4 font-semibold text-[#a0aec0]">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social clay buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    className="gap-2 rounded-2xl border-none bg-[#e0e5ec] py-2.5 font-semibold text-[#4a5568]
                      shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
                      transition-all duration-150
                      hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
                      active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                  >
                    <FaGoogle className="text-lg text-red-400" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    className="gap-2 rounded-2xl border-none bg-[#e0e5ec] py-2.5 font-semibold text-[#4a5568]
                      shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
                      transition-all duration-150
                      hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
                      active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                  >
                    <FaGithub className="text-lg text-[#4a5568]" />
                    GitHub
                  </Button>
                </div>

                {/* Trust badge */}
                <div className="mt-5 flex items-center justify-center gap-3 text-[11px] font-semibold text-[#a0aec0]">
                  <span className="flex items-center">
                    <FaShieldAlt className="mr-1 text-indigo-400" />
                    Secure
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <FaCheck className="mr-1 h-3 w-3 text-indigo-400" />
                    Privacy Protected
                  </span>
                  <span>•</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;