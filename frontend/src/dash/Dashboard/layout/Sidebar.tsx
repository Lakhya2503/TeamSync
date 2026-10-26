import React, { useState } from "react";
import {
  HomeIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  UsersIcon,
  ClipboardListIcon,
  CalendarIcon,
  BarChart2Icon,
  HelpCircleIcon,
  LayersIcon,
  VideoIcon,
  ListChecksIcon,
  UserIcon,
  BellIcon,
} from "lucide-react";
import { FaTasks } from "react-icons/fa";
import useAuthStore from "../../../app/authStore";
import { useNavigate, NavLink } from "react-router-dom";
import { Logo_image } from "../../../assets";
import type { userType } from "../../../types/user.type";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.userLogout);
  const user = useAuthStore((state) => state.user) as userType | null;
  const role = (useAuthStore((state) => state.role) || "").toLowerCase();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ---- Role-specific nav configs (single source of truth) ----------------
  const adminNav: NavItem[] = [
    { icon: <HomeIcon size={20} />, label: "Dashboard", href: `/${role}/dashboard` },
    { icon: <FaTasks size={20} />, label: "Team", href: `/${role}/team` },
    { icon: <UsersIcon size={20} />, label: "Users", href: `/${role}/users` },
    { icon: <ClipboardListIcon size={20} />, label: "Needs", href: `/${role}/needs` },
    { icon: <VideoIcon size={20} />, label: "Sessions", href: `/${role}/sessions` },
    { icon: <ListChecksIcon size={20} />, label: "Plan", href: `/${role}/plan` },
    { icon: <CalendarIcon size={20} />, label: "Evaluations", href: `/${role}/evaluations` },
    { icon: <LayersIcon size={20} />, label: "Catalogs", href: `/${role}/catalogs` },
    { icon: <BarChart2Icon size={20} />, label: "Reports", href: `/${role}/reports` },
    { icon: <SettingsIcon size={20} />, label: "Settings", href: `/${role}/setting` },
    { icon: <HelpCircleIcon size={20} />, label: "Support", href: `/${role}/support` },
  ];

  const managerNav: NavItem[] = [
    { icon: <HomeIcon size={20} />, label: "Dashboard", href: `/${role}/dashboard` },
    { icon: <UsersIcon size={20} />, label: "Users", href: `/${role}/users` },
    { icon: <ClipboardListIcon size={20} />, label: "Needs", href: `/${role}/needs` },
    { icon: <VideoIcon size={20} />, label: "Sessions", href: `/${role}/sessions` },
    { icon: <ListChecksIcon size={20} />, label: "Plan", href: `/${role}/plan` },
    { icon: <CalendarIcon size={20} />, label: "Evaluations", href: `/${role}/evaluations` },
    { icon: <LayersIcon size={20} />, label: "Catalogs", href: `/${role}/catalogs` },
    { icon: <BarChart2Icon size={20} />, label: "Reports", href: `/${role}/reports` },
    { icon: <SettingsIcon size={20} />, label: "Settings", href: `/${role}/settings` },
    { icon: <HelpCircleIcon size={20} />, label: "Support", href: `/${role}/support` },
    { icon: <BellIcon size={20} />, label: "Notifications", href: `/${role}/notifications` },
    { icon: <UserIcon size={20} />, label: "Profile", href: `/${role}/profile` },
  ];

  const userNav: NavItem[] = [
    { icon: <HomeIcon size={20} />, label: "Dashboard", href: `/${role}/dashboard` },
    { icon: <ClipboardListIcon size={20} />, label: "Needs", href: `/${role}/needs` },
    { icon: <VideoIcon size={20} />, label: "Sessions", href: `/${role}/sessions` },
    { icon: <ListChecksIcon size={20} />, label: "Plan", href: `/${role}/plan` },
    { icon: <CalendarIcon size={20} />, label: "Evaluations", href: `/${role}/evaluations` },
    { icon: <LayersIcon size={20} />, label: "Catalogs", href: `/${role}/catalogs` },
    { icon: <BarChart2Icon size={20} />, label: "Reports", href: `/${role}/reports` },
    { icon: <SettingsIcon size={20} />, label: "Settings", href: `/${role}/settings` },
    { icon: <HelpCircleIcon size={20} />, label: "Support", href: `/${role}/support` },
    { icon: <BellIcon size={20} />, label: "Notifications", href: `/${role}/notifications` },
    { icon: <UserIcon size={20} />, label: "Profile", href: `/${role}/profile` },
  ];

  const navItems: NavItem[] =
    role === "admin" ? adminNav : role === "manager" ? managerNav : userNav;

  const roleLabel =
    role === "admin" ? "Admin Panel" : role === "manager" ? "Manager Panel" : "User Panel";

  if (!isAuthenticated) {
    return <div className="font-semibold text-indigo-600">LOGIN FIRST</div>;
  }

  return (
    <>
      {/* Mobile Menu Toggle — clay puck */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full
          bg-[#e0e5ec] text-indigo-500
          shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
          transition-all duration-150
          hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
          active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]
          lg:hidden"
      >
        {isOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
      </button>

      {/* Sidebar — clay panel */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-full bg-[#e0e5ec] text-[#4a5568]
          shadow-[12px_0_30px_#b8bec7,-12px_0_30px_#ffffff]
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 lg:w-20"}
          overflow-hidden
        `}
      >
        {/* Brand — clay puck */}
        <div className="flex h-20 items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]">
            <img src={Logo_image} alt="Logo" className="h-8 object-contain" />
          </div>
        </div>

        {/* Role label */}
        {isOpen && (
          <div className="px-5 pb-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#a0aec0]">
              {roleLabel}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav
          className="mt-1 overflow-y-auto px-3"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `
                    group flex items-center gap-3 rounded-2xl px-4 py-3
                    transition-all duration-150
                    ${
                      isActive
                        ? "bg-[#e0e5ec] text-indigo-600 shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                        : "bg-[#e0e5ec] text-[#718096] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff] hover:text-indigo-500 active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`transition-colors duration-150 ${
                          isActive
                            ? "text-indigo-600"
                            : "text-[#a0aec0] group-hover:text-indigo-500"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`text-sm ${!isOpen ? "lg:hidden" : ""} ${
                          isActive
                            ? "font-bold text-indigo-600"
                            : "font-semibold text-[#4a5568] group-hover:text-indigo-500"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && isOpen && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400 shadow-[1px_1px_3px_#b8bec7,-1px_-1px_3px_#ffffff]" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer — clay logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-2xl bg-[#e0e5ec] px-4 py-3
              shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
              transition-all duration-150
              hover:text-rose-500
              hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
              active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]"
          >
            <LogOutIcon
              size={20}
              className="text-[#a0aec0] transition-colors group-hover:text-rose-500"
            />
            <span
              className={`text-sm font-semibold text-[#4a5568] ${
                !isOpen ? "lg:hidden" : ""
              } transition-colors group-hover:text-rose-500`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;