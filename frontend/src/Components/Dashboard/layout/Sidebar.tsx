import React, { useState } from "react";
import {
  HomeIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { VscNewSession } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { IoLogoAppleAr } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import useAuthStore from "../../../app/authStore";
import { useNavigate, NavLink } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.userLogout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems: NavItem[] = [
    { icon: <HomeIcon size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <PiUsersThreeLight size={20} />, label: "Users", href: "/users" },
    {
      icon: <MdOutlineEditCalendar size={20} />,
      label: "Needs",
      href: "/needs",
    },
    { icon: <FaRegListAlt size={20} />, label: "Plan", href: "/plan" },
    { icon: <VscNewSession size={20} />, label: "Session", href: "/sessions" },
    { icon: <CiCalendar size={20} />, label: "Evalution", href: "/evalutions" },
    { icon: <IoLogoAppleAr size={20} />, label: "Catalogs", href: "/catalogs" },
    { icon: <GoReport size={20} />, label: "Report", href: "/reports" },
    { icon: <SettingsIcon size={20} />, label: "Settings", href: "/settings" },
    { icon: <BiSupport size={20} />, label: "Support", href: "/support" },
  ];

  if (!isAuthenticated) {
    return <div className="text-indigo-600 font-semibold">LOGIN FIRST</div>;
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-indigo-200 hover:bg-indigo-50 transition-colors"
      >
        {isOpen ? (
          <XIcon size={24} className="text-indigo-700" />
        ) : (
          <MenuIcon size={24} className="text-indigo-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-white text-gray-800
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-64" : "w-0 lg:w-20"}
        overflow-hidden
        shadow-lg border-r border-indigo-100
      `}
      >
        {/* Brand */}
        <div className="flex items-center justify-center h-16 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
          <span className={`font-bold text-xl text-indigo-700 ${!isOpen && "lg:hidden"}`}>
            MyApp
          </span>
          {isOpen && (
            <span className="ml-2 text-sm text-indigo-600">v1.0</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg 
                    transition-all duration-200 group border
                    ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-sm"
                        : "hover:bg-indigo-50 hover:text-indigo-600 border-transparent hover:border-indigo-200"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`
                          transition-colors duration-200
                          ${isActive ? "text-indigo-700" : "text-gray-500 group-hover:text-indigo-600"}
                        `}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`
                          ${!isOpen && "lg:hidden"} 
                          text-sm font-medium 
                          ${isActive ? "text-indigo-700 font-semibold" : "text-gray-700 group-hover:text-indigo-700"}
                        `}
                      >
                        {item.label}
                      </span>
                      {isActive && isOpen && (
                        <span className="ml-auto w-1.5 h-8 bg-indigo-600 rounded-full shadow-sm"></span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full border border-transparent hover:border-red-200"
          >
            <LogOutIcon size={20} className="text-gray-500 group-hover:text-red-600 transition-colors" />
            <span className={`text-sm font-medium text-gray-700 ${!isOpen && "lg:hidden"} hover:text-red-600 transition-colors`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;