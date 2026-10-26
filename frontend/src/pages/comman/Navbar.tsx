import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../app/authStore";
import { Logo_image, User_image } from "../../assets";

const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayPuck = 'flex items-center justify-center rounded-full bg-[#e0e5ec] shadow-[4px_4px_10px_#b8bec7,-4px_-4px_10px_#ffffff] transition-all duration-150 hover:shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]'

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.userLogout);

  const avatar = user?.avatar ? user.avatar : User_image

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { path: "/about", label: "About", requiresAuth: false },
    { path: "/help", label: "Help", requiresAuth: false },
    { path: "/contact", label: "Contact", requiresAuth: false },
  ];
  const filteredNavItems = navItems.filter((item) => !item.requiresAuth || isAuthenticated);
  const userData = user;

  return (
    <header className="sticky top-0 z-40 bg-[#e0e5ec] px-4 pt-3">
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] px-4 py-3 md:px-6 ${clayRaised}`}>
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <img src={Logo_image} alt="TeamSync" className="h-9 w-auto object-contain" />
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center space-x-2 md:flex">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="rounded-2xl px-4 py-2 text-sm font-bold text-[#4a5568] transition-all duration-150 hover:text-indigo-500 hover:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative group">
              <button className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 ${clayRaised}`}>
                <img
                  src={avatar}
                  alt={userData?.name || "User"}
                  className="h-9 w-9 rounded-full border-2 border-white/60 object-cover shadow-[inset_2px_2px_5px_rgba(90,70,200,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.4)]"
                />
                <span className="hidden text-xs font-bold text-[#4a5568] sm:block">{userData?.name}</span>
                <svg className="h-4 w-4 text-[#a0aec0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className={`invisible absolute right-0 mt-3 w-56 rounded-[1.5rem] py-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 ${clayRaised}`}>
                <div className="px-4 py-2">
                  <p className="text-sm font-bold text-[#4a5568]">{userData?.name}</p>
                  <p className="truncate text-xs font-medium text-indigo-500">{userData?.email}</p>
                </div>
                <div className="mx-4 my-1 h-px bg-[#c3cad5]/60" />
                <Link to={`/${role}/dashboard`} className="mx-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#4a5568] transition-all hover:bg-[#e0e5ec] hover:text-indigo-500 hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]">
                  Dashboard
                </Link>
                <Link to="/profile" className="mx-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#4a5568] transition-all hover:bg-[#e0e5ec] hover:text-indigo-500 hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]">
                  Profile
                </Link>
                <Link to="/settings" className="mx-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#4a5568] transition-all hover:bg-[#e0e5ec] hover:text-indigo-500 hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]">
                  Settings
                </Link>
                <div className="mx-4 my-1 h-px bg-[#c3cad5]/60" />
                <button
                  onClick={handleLogout}
                  className="mx-2 block w-[calc(100%-1rem)] rounded-xl px-3 py-2 text-left text-sm font-bold text-rose-500 transition-all hover:bg-rose-50 hover:shadow-[inset_3px_3px_6px_#e8b8c0,inset_-3px_-3px_6px_#ffffff]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-2xl px-4 py-2 text-sm font-bold text-indigo-500 transition-all hover:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-2xl px-5 py-2 text-sm font-bold text-white
                  bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                  shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
                  transition-all duration-150
                  hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                  hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
                  active:shadow-[inset_4px_4px_10px_rgba(90,70,200,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.5)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;