import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo_circle_image } from '../../assets';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    let strength = 0;
    if (value.length >= 8) strength += 25;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength += 25;
    if (/\d/.test(value)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(value)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password reset successfully!');
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-rose-400';
    if (passwordStrength <= 50) return 'bg-orange-400';
    if (passwordStrength <= 75) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
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
            <h2 className="text-3xl font-extrabold text-[#4a5568]">Reset Password</h2>
            <p className="mt-2 text-sm font-medium text-[#718096]">
              Create a new strong password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#4a5568] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`${clayInput} pr-12`}
                  placeholder="Enter new password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0aec0] hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#718096]">Password Strength</span>
                    <span className="text-xs font-bold text-[#4a5568]">{getStrengthText()}</span>
                  </div>
                  {/* Clay inset track */}
                  <div
                    className="w-full h-2.5 rounded-full bg-[#e0e5ec] overflow-hidden
                      shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]"
                  >
                    <div
                      className={`h-full rounded-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <ul className="text-xs text-[#a0aec0] space-y-1 font-medium">
                    <li className={password.length >= 8 ? 'text-emerald-600' : ''}>
                      • At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-emerald-600' : ''}>
                      • Contains uppercase & lowercase letters
                    </li>
                    <li className={/\d/.test(password) ? 'text-emerald-600' : ''}>
                      • Contains a number
                    </li>
                    <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-emerald-600' : ''}>
                      • Contains a special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-[#4a5568] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${clayInput} ${
                  confirmPassword && password !== confirmPassword
                    ? 'ring-2 ring-rose-400/60'
                    : ''
                }`}
                placeholder="Confirm new password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-sm font-semibold text-rose-500">Passwords do not match!</p>
              )}
            </div>

            {/* Clay primary button */}
            <button
              type="submit"
              disabled={!password || !confirmPassword || password !== confirmPassword}
              className="w-full rounded-2xl border-none py-3 font-bold text-white
                bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                transition-all duration-150
                hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Password
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
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;