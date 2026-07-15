import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../app/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.userLogout);

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Filter nav items based on authentication status
  const navItems = [
    { path: "/dashboard", label: "Dashboard", requiresAuth: true },
    { path: "/teams", label: "Teams", requiresAuth: true },
    { path: "/projects", label: "Projects", requiresAuth: true },
    { path: "/calendar", label: "Calendar", requiresAuth: true },
    { path: "/about", label: "About", requiresAuth: false },
    { path: "/help", label: "Help", requiresAuth: false },
    { path: "/contact", label: "Contact", requiresAuth: false },
  ];

  // Filter items based on authentication
  const filteredNavItems = navItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  // Default user data for when user is not fully loaded
  const defaultUser = {
    name: "User",
    email: "user@example.com",
    avatar: "https://ui-avatars.com/api/?name=User&background=FCD34D&color=fff",
  };

  // Use user data with fallback to default
  const userData = user || defaultUser;

  return (
    <header className="bg-white border-b border-yellow-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                TS
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Team<span className="text-yellow-500">Sync</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // User is authenticated - show profile with avatar
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-10 h-10 rounded-full border-2 border-yellow-400 hover:border-yellow-500 transition-colors"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {userData.name}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userData.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // User is not authenticated - show login/signup buttons
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-yellow-200/50"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;