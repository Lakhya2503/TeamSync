import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/authStore";
import { Input } from "#components/ui/input";
import { Field, FieldDescription, FieldLabel } from "#components/ui/field";
import { Button } from "@base-ui/react/button";

const OtpPage = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showResend, setShowResend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const userVerifyEmail = useAuthStore((state) => state.userVerifyEmail);
  const emailVerifticationRequest = useAuthStore(
    (state) => state.userVerifyEmailRequest
  );

  const navigate = useNavigate();

  const handleResendEmailVerificationRequest = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await emailVerifticationRequest({ email });
      setMessage({
        type: "success",
        text: "Verification code sent to your email.",
      });
      setShowResend(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send verification code. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verificationCode) {
      setMessage({
        type: "error",
        text: "Please enter the verification code.",
      });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await userVerifyEmail({ verificationCode });
      setMessage({ type: "success", text: "Email verified successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Invalid or expired code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // shared clay input classes
  const clayInput =
    "h-auto rounded-2xl border-none bg-[#e0e5ec] px-4 py-3 text-[#4a5568] placeholder-[#a0aec0] " +
    "shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff] transition-shadow duration-200 " +
    "focus-visible:ring-2 focus-visible:ring-indigo-300/50 focus-visible:ring-offset-0";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#e0e5ec] px-4">
      {/* Claymorphic pastel background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Clay card shell */}
        <div
          className="rounded-[2.5rem] border-none bg-[#e0e5ec] p-3
            shadow-[20px_20px_60px_#b8bec7,-20px_-20px_60px_#ffffff]"
        >
          <div className="rounded-[2rem] p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Clay icon puck */}
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#e0e5ec]
                  shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e0e5ec]
                    shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                >
                  <svg
                    className="w-7 h-7 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-[#4a5568]">
                {showResend ? "Resend Verification" : "Verify Your Email"}
              </h1>
              <p className="text-sm font-medium text-[#718096] mt-2">
                {showResend
                  ? "Enter your email to receive a new verification code."
                  : "Enter the 6-digit code sent to your email."}
              </p>
            </div>

            {/* Clay alert message */}
            {message && (
              <div
                className={`mb-6 px-4 py-3 rounded-2xl text-sm font-semibold border-none ${
                  message.type === "success"
                    ? "bg-[#e0e5ec] text-emerald-600 shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]"
                    : "bg-[#e0e5ec] text-rose-500 shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Resend form */}
            {showResend ? (
              <form
                onSubmit={handleResendEmailVerificationRequest}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email_field"
                    className="block text-sm font-bold text-[#4a5568] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email_field"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${clayInput}`}
                  />
                </div>

                {/* Clay primary button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl border-none py-3 font-bold text-white
                    bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                    shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                    transition-all duration-150
                    hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                    hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                    active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]
                    disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setShowResend(false);
                    setMessage(null);
                  }}
                  className="w-full text-sm font-semibold text-[#718096] hover:text-indigo-500 transition-colors"
                >
                  ← Back to verification
                </button>
              </form>
            ) : (
              /* OTP form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field>
                  <FieldLabel
                    htmlFor="otp_field"
                    className="text-sm font-bold text-[#4a5568] mb-2 block"
                  >
                    Verification Code
                  </FieldLabel>
                  <Input
                    type="text"
                    id="otp_field"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className={`w-full h-14 text-center text-lg tracking-widest ${clayInput}`}
                  />
                  <FieldDescription className="text-xs font-medium text-[#a0aec0] mt-2">
                    Check your inbox and spam folder for the code.
                  </FieldDescription>
                </Field>

                {/* Clay primary button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl border-none py-3 font-bold text-white
                    bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                    shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                    transition-all duration-150
                    hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                    hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                    active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]
                    disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </Button>

                <div className="text-center">
                  <span className="text-sm font-medium text-[#718096]">
                    Didn't receive a code?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResend(true);
                      setMessage(null);
                    }}
                    className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    Resend
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;