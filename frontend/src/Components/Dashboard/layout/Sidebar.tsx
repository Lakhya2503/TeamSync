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
import { useNavigate } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.userLogout);
  const navigate = useNavigate()

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

  if(!isAuthenticated) {
    return <div> LOGIN FIRST </div>
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-64" : "w-0 lg:w-20"}
        overflow-hidden
      `}
      >
        {/* Brand */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className={`font-bold text-xl ${!isOpen && "lg:hidden"}`}>
            MyApp
          </span>
          {isOpen && <span className="ml-2 text-sm text-gray-400">v1.0</span>}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className={`${!isOpen && "lg:hidden"} text-sm`}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full">
            <LogOutIcon size={20} className="text-gray-400" />
            <span className={`text-sm ${!isOpen && "lg:hidden"}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
